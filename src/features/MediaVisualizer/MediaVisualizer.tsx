import { useGlobalState } from '@/utils/GlobalState.tsx';
import { useEffect, useRef } from 'react';
import BucketService from '@/utils/BucketService.ts';
import ArrayTools from '@/utils/ArrayTools.ts';
import './MediaVisualizer.css';
import anime from 'animejs';

export default function MediaVisualizer() {
  const { state, dispatch } = useGlobalState();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const {
    frequencyData,
    imageFiles,
    currentTrack,
    currentImageIndex,
    currentImage,
  } = state;

  useEffect(() => {
    const fetchImageFiles = async () => {
      const bucketService: BucketService = new BucketService();
      let bucketFiles = await bucketService.bucketContents('images/');
      bucketFiles = new ArrayTools().shuffleArray(bucketFiles);
      bucketFiles.forEach((imageFile) => {
        const fileUrl = `${import.meta.env.VITE_DIGITAL_OCEAN_SPACES_ENDPOINT}/${imageFile.Key}`;
        dispatch({
          type: 'ADD_IMAGE_FILE',
          payload: fileUrl,
        });
      });

      dispatch({
        type: 'SET_CURRENT_IMAGE_INDEX',
        payload: 0,
      });
    };

    fetchImageFiles();
  }, [dispatch]);

  useEffect(() => {
    if (currentImageIndex !== null && currentTrack && imageFiles.length) {
      let i = currentImageIndex;
      i++;
      if (i >= imageFiles.length) {
        i = 0;
      }
      dispatch({
        type: 'SET_CURRENT_IMAGE_INDEX',
        payload: i,
      });

      dispatch({
        type: 'SET_IMAGE_LOADING',
        payload: true,
      });

      dispatch({
        type: 'SET_CURRENT_IMAGE',
        payload: imageFiles[i],
      });
    }
  }, [currentTrack]);

  useEffect(() => {
    if (svgRef.current && frequencyData) {
      const svg = svgRef.current;
      const width = svg.clientWidth || svg.parentElement?.clientWidth || 500;
      const height = svg.clientHeight || svg.parentElement?.clientHeight || 500;
      const pathData = generateWaveformPath(frequencyData, width, height);

      const pathElement = svg.querySelector('path');
      if (pathElement) {
        pathElement.setAttribute('d', pathData);
        anime({
          targets: pathElement,
          d: pathData,
          easing: 'easeOutQuad',
          duration: 5000,
        });
      } else {
        console.error('Path element not found');
      }
    }
  }, [frequencyData, currentImage]);

  const generateWaveformPath = (
    data: Uint8Array,
    width: number,
    height: number,
  ): string => {
    const slicedData = data.slice(0, data.length / 4);
    const sliceWidth = width / slicedData.length;
    let path = `M 0 ${height / 2}`;

    for (let i = 0; i < slicedData.length - 1; i++) {
      const x1 = i * sliceWidth;
      const y1 = (slicedData[i] / 255) * height;
      const x2 = (i + 1) * sliceWidth;
      const y2 = (slicedData[i + 1] / 255) * height;

      const cp1x = x1 + sliceWidth / 4;
      const cp1y = height - y1;
      const cp2x = x2 - sliceWidth / 4;
      const cp2y = height - y2;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${height - y2}`;
    }

    path += ` L ${width} ${height} L 0 ${height} Z`;
    return path;
  };

  const handleImageLoaded = () => {
    dispatch({
      type: 'SET_IMAGE_LOADING',
      payload: false,
    });
  };

  return (
    currentImage && (
      <section id={'media-visualizer'}>
        <svg
          id={'media-visualizer-svg'}
          ref={svgRef}
          width="100%"
          height="100%"
        >
          <path />
        </svg>
        <img
          src={currentImage}
          onLoad={handleImageLoaded}
          crossOrigin={'anonymous'}
          ref={imageRef}
          alt={'current image'}
          id={'media-visualizer-image'}
        />
      </section>
    )
  );
}

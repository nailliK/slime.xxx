import { useGlobalState } from '@/utils/GlobalState.tsx';
import { useEffect, useRef } from 'react';
import BucketService from '@/utils/BucketService.ts';
import ArrayTools from '@/utils/ArrayTools.ts';
import './MediaVisualizer.css';

export default function MediaVisualizer() {
  const { state, dispatch } = useGlobalState();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const {
    frequencyData,
    imageFiles,
    imageLoading,
    playing,
    currentTrack,
    currentImageIndex,
    currentImage,
  } = state;

  useEffect(() => {
    const fetchImageFiles = async () => {
      console.log('hi');
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
    if (
      !imageLoading &&
      playing &&
      canvasRef.current &&
      imageRef.current &&
      frequencyData
    ) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = imageRef.current;

      // Set canvas dimensions to match the CSS styling
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Clear the canvas
      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      // Cut off the last third of the frequency data
      const trimmedFrequencyData = frequencyData.slice(
        0,
        Math.floor((frequencyData.length * 2) / 4),
      );
      const sliceWidth = canvas.width / trimmedFrequencyData.length;
      const imgAspectRatio = img.naturalWidth / img.naturalHeight;
      const canvasAspectRatio = canvas.width / canvas.height;

      let sx = 0,
        sy = 0,
        sWidth = img.naturalWidth,
        sHeight = img.naturalHeight;

      if (imgAspectRatio > canvasAspectRatio) {
        sWidth = img.naturalHeight * canvasAspectRatio;
        sx = (img.naturalWidth - sWidth) / 2;
      } else {
        sHeight = img.naturalWidth / canvasAspectRatio;
        sy = (img.naturalHeight - sHeight) / 2;
      }

      for (let i = 0; i < trimmedFrequencyData.length; i++) {
        const sliceHeight = (trimmedFrequencyData[i] / 255) * canvas.height;

        ctx?.drawImage(
          img,
          sx + (i * sWidth) / trimmedFrequencyData.length, // Source x
          sy, // Source y
          sWidth / trimmedFrequencyData.length, // Source width
          sHeight, // Source height
          i * sliceWidth, // Destination x
          0, // Destination y
          sliceWidth, // Destination width
          canvas.height, // Destination height
        );

        // Crop the slice based on frequency data
        ctx?.clearRect(
          i * sliceWidth,
          0,
          sliceWidth,
          canvas.height - sliceHeight,
        );
      }
    }
  }, [frequencyData, currentImage]);

  const handleImageLoaded = () => {
    dispatch({
      type: 'SET_IMAGE_LOADING',
      payload: false,
    });
  };

  return (
    currentImage && (
      <section id={'media-visualizer'}>
        <div>Image Loading: {imageLoading.toString()}</div>
        <canvas id={'media-visualizer-canvas'} ref={canvasRef}></canvas>
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

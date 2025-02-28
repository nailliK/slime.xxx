import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

interface State {
  audioFiles: string[];
  audioLoading: boolean;

  currentTrackIndex: number | null;
  currentTrack: string | null;

  userInteracting: boolean;

  playing: boolean;
  currentTime: number | null;
  totalTime: number | null;
  frequencyData: Uint8Array;

  imageFiles: string[];
  imageLoading: boolean;

  currentImageIndex: number | null;
  currentImage: string | null;
}

type Action =
  | { type: 'ADD_AUDIO_FILE'; payload: string }
  | { type: 'SET_USER_INTERACTING'; payload: boolean }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_CURRENT_TRACK'; payload: string | null }
  | { type: 'SET_CURRENT_TRACK_INDEX'; payload: number | null }
  | { type: 'SET_CURRENT_TIME'; payload: number | null }
  | { type: 'SET_TOTAL_TIME'; payload: number | null }
  | { type: 'SET_FREQUENCY_DATA'; payload: Uint8Array }
  | { type: 'SET_AUDIO_LOADING'; payload: boolean }
  | { type: 'ADD_IMAGE_FILE'; payload: string }
  | { type: 'SET_CURRENT_IMAGE_INDEX'; payload: number | null }
  | { type: 'SET_CURRENT_IMAGE'; payload: string | null }
  | { type: 'SET_IMAGE_LOADING'; payload: boolean };

function globalStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_AUDIO_FILE':
      return { ...state, audioFiles: [...state.audioFiles, action.payload] };
    case 'SET_PLAYING':
      return { ...state, playing: action.payload };
    case 'SET_USER_INTERACTING':
      return { ...state, userInteracting: action.payload };
    case 'SET_CURRENT_TRACK':
      return { ...state, currentTrack: action.payload };
    case 'SET_CURRENT_TRACK_INDEX':
      return { ...state, currentTrackIndex: action.payload };
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_TOTAL_TIME':
      return { ...state, totalTime: action.payload };
    case 'SET_FREQUENCY_DATA':
      return { ...state, frequencyData: action.payload };
    case 'SET_AUDIO_LOADING':
      return { ...state, audioLoading: action.payload };
    case 'ADD_IMAGE_FILE':
      return { ...state, imageFiles: [...state.imageFiles, action.payload] };
    case 'SET_CURRENT_IMAGE_INDEX':
      return { ...state, currentImageIndex: action.payload };
    case 'SET_CURRENT_IMAGE':
      return { ...state, currentImage: action.payload };
    case 'SET_IMAGE_LOADING':
      return { ...state, imageLoading: action.payload };
    default:
      return state;
  }
}

const GlobalStateContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

const initialState: State = {
  audioFiles: [],
  audioLoading: false,

  currentTrack: null,
  currentTrackIndex: null,

  userInteracting: false,
  playing: false,

  currentTime: null,
  totalTime: null,
  frequencyData: new Uint8Array(0),

  imageFiles: [],
  imageLoading: false,

  currentImageIndex: null,
  currentImage: null,
};

const addAudioFile = (dispatch: Dispatch<Action>, file: string) => {
  dispatch({ type: 'ADD_AUDIO_FILE', payload: file });
};

const setUserInteracting = (
  dispatch: Dispatch<Action>,
  interacting: boolean,
) => {
  dispatch({ type: 'SET_USER_INTERACTING', payload: interacting });
};

const setPlaying = (dispatch: Dispatch<Action>, playing: boolean) => {
  dispatch({ type: 'SET_PLAYING', payload: playing });
};

const setCurrentTrackIndex = (
  dispatch: Dispatch<Action>,
  track: number | null,
) => {
  dispatch({ type: 'SET_CURRENT_TRACK_INDEX', payload: track });
};

const setCurrentTrack = (dispatch: Dispatch<Action>, track: string | null) => {
  dispatch({ type: 'SET_CURRENT_TRACK', payload: track });
};

const setCurrentTime = (dispatch: Dispatch<Action>, time: number | null) => {
  dispatch({ type: 'SET_CURRENT_TIME', payload: time });
};

const setTotalTime = (dispatch: Dispatch<Action>, time: number | null) => {
  dispatch({ type: 'SET_TOTAL_TIME', payload: time });
};

const setFrequencyData = (dispatch: Dispatch<Action>, data: Uint8Array) => {
  dispatch({ type: 'SET_FREQUENCY_DATA', payload: data });
};

const setAudioLoading = (dispatch: Dispatch<Action>, audioLoading: boolean) => {
  dispatch({ type: 'SET_AUDIO_LOADING', payload: audioLoading });
};

const addImageFile = (dispatch: Dispatch<Action>, file: string) => {
  dispatch({ type: 'ADD_IMAGE_FILE', payload: file });
};

const setCurrentImageIndex = (
  dispatch: Dispatch<Action>,
  index: number | null,
) => {
  dispatch({ type: 'SET_CURRENT_IMAGE_INDEX', payload: index });
};

const setCurrentImage = (dispatch: Dispatch<Action>, image: string | null) => {
  dispatch({ type: 'SET_CURRENT_IMAGE', payload: image });
};

const setImageLoading = (dispatch: Dispatch<Action>, loading: boolean) => {
  dispatch({ type: 'SET_IMAGE_LOADING', payload: loading });
};

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export {
  GlobalStateProvider,
  useGlobalState,
  globalStateReducer,
  addAudioFile,
  setUserInteracting,
  setPlaying,
  setCurrentTrack,
  setCurrentTrackIndex,
  setCurrentTime,
  setTotalTime,
  setFrequencyData,
  setAudioLoading,
  addImageFile,
  setCurrentImageIndex,
  setCurrentImage,
  setImageLoading,
};

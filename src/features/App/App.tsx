import './App.css';
import Main from '@/features/Main';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { GlobalStateProvider } from '@/utils/GlobalState.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStateProvider>
      <Header />
      <Main />
      <Footer />
    </GlobalStateProvider>
  </StrictMode>,
);

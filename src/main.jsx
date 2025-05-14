import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import './styles/index.css';
import App from './App.jsx';
import BookingProvider from './choice/choiceContext/BookingContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookingProvider> 
      <App />
    </BookingProvider>
  </StrictMode>
);
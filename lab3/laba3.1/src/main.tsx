import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Buttons from './Buttons.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Buttons count={5} />
  </StrictMode>
);
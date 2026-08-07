import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import EmbeddedInsurancePage from './pages/EmbeddedInsurancePage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmbeddedInsurancePage />
  </StrictMode>,
);

import './fonts.scss';
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { I18nextProvider } from 'react-i18next';
import { i18n } from './i18';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import 'leaflet/dist/leaflet.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <HelmetProvider>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </HelmetProvider>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>,
);

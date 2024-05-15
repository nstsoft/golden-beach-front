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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);

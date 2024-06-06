import i18n from 'i18next';
import enTranslation from 'translations/en.json';
import itTranslation from 'translations/it.json';
import { Language } from 'utils';

const inStorage = localStorage.getItem('language');
const language = inStorage ? JSON.parse(inStorage) : Language.en;
i18n.init({
  interpolation: { escapeValue: false },
  lng: language,
  resources: {
    en: { translation: enTranslation },
    it: { translation: itTranslation },
  },
  fallbackLng: 'en',
});

export { i18n };

import i18n from 'i18next';
import enTranslation from 'translations/en.json';
import itTranslation from 'translations/it.json';
import { Language } from 'utils';

const inStorage = localStorage.getItem('language');
const language = inStorage ? JSON.parse(inStorage) : Language.it;
i18n.init({
  interpolation: { escapeValue: false },
  lng: language,
  resources: {
    en: { translation: enTranslation },
    it: { translation: itTranslation },
  },
  supportedLngs: Object.values(Language),
  fallbackLng: 'it',
});

export { i18n };

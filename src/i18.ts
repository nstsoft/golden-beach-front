import i18n from 'i18next';
import enTranslation from 'translations/en.json';
import itTranslation from 'translations/it.json';

i18n.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: { translation: enTranslation },
    it: { translation: itTranslation },
  },
  fallbackLng: 'en',
});

export { i18n };

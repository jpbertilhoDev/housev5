import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import ptTranslation from './locales/pt.json';
import deTranslation from './locales/de.json';
import frTranslation from './locales/fr.json';
import itTranslation from './locales/it.json';

// the translations
const resources = {
  en: {
    translation: enTranslation
  },
  pt: {
    translation: ptTranslation
  },
  de: {
    translation: deTranslation
  },
  fr: {
    translation: frTranslation
  },
  it: {
    translation: itTranslation
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n; 
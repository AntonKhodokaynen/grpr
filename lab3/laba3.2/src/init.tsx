import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import en from './locales/en';
import ru from './locales/ru';

const init = () => {
  const i18n = i18next.createInstance();
  i18n
    .use(intervalPlural)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        ru: { translation: ru },
      },
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
  return i18n;
};

export default init;
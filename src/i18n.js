import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import fr from './locales/it.json';

const i18n = createI18n({
  legacy: false, // use Composition API
  locale: 'en', // default locale
  fallbackLocale: 'en',
  messages: {
    en,
    fr,
  },
});

export default i18n;

import { createI18n } from 'vue-i18n';
import en from './lang/en.json';
import ru from './lang/ru.json';

const messages = {
  en,
  ru,
};

const i18n = createI18n({
  locale: 'ru', // Язык по умолчанию
  fallbackLocale: 'en', // Резервный язык
  messages,
});

export default i18n;
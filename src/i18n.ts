import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

// Locales
import en from "./locales/en.json";
import de from "./locales/de.json";
import es from "./locales/es.json";
import nl from "./locales/nl.json";

/**
 * Add global TypeScript support to allow `t('key', { defaultValue })` without errors
 */
declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: "en",
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

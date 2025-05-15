import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
    es: { translation: es },
    nl: { translation: nl },
  },
  lng: "en",
  fallbackLng: "en",
  returnNull: false, // ensures fallback to defaultValue instead of null
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

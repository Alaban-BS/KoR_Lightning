import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { i18n as i18nType } from "i18next";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

const TitleBar: React.FC = () => {
  const { t, i18n } = useTranslation() as {
    t: (key: string, options?: any) => string;
    i18n: i18nType;
  };
  const [language, setLanguage] = useState(i18n.language);
  const navigate = useNavigate();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  useEffect(() => {
    const onLanguageChanged = (lng: string) => setLanguage(lng);
    i18n.on("languageChanged", onLanguageChanged);
    return () => {
      i18n.off("languageChanged", onLanguageChanged);
    };
  }, [i18n]);

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    navigate("/login");
  };

  return (
    <div className="top-bar">
      <div className="top-bar-inner">
        <div className="top-bar-left">
          <span className="page-title">{t("page.title", { defaultValue: "Lightning-fast ordering" })}</span>
        </div>
        <div className="top-bar-center">
          <label htmlFor="language-selector" className="language-label">
            {t("language.select", { defaultValue: "Select language" })}:
          </label>
          <select
            id="language-selector"
            className="language-selector"
            onChange={handleLanguageChange}
            value={language}
          >
            <option value="en">{t("language.en", { defaultValue: "English" })}</option>
            <option value="de">{t("language.de", { defaultValue: "German" })}</option>
            <option value="es">{t("language.es", { defaultValue: "Spanish" })}</option>
            <option value="nl">{t("language.nl", { defaultValue: "Dutch" })}</option>
          </select>
        </div>
        <div className="top-bar-right">
          <button className="logout-button" onClick={handleLogout}>
            {t("logout.button", { defaultValue: "Logout" })}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
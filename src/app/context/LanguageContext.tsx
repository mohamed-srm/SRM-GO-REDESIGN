"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "fr" | "ar" | "ber";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("srm-language");

    if (saved === "fr" || saved === "ar" || saved === "ber") {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("srm-language", language);
    document.documentElement.lang =
      language === "fr" ? "fr" : language === "ar" ? "ar" : "zgh";
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}

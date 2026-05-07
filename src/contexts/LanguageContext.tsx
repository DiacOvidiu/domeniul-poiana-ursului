import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { ro } from "@/i18n/ro";

export type Language = "ro" | "en";
export type Translations = typeof ro;

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

let cachedEn: Translations | null = null;
let enPromise: Promise<Translations> | null = null;

function loadEn(): Promise<Translations> {
  if (cachedEn) return Promise.resolve(cachedEn);
  if (!enPromise) {
    enPromise = import("@/i18n/en").then((mod) => {
      cachedEn = mod.en as Translations;
      return cachedEn;
    });
  }
  return enPromise;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === "undefined") return "ro";
    return localStorage.getItem("lang") === "en" ? "en" : "ro";
  });
  const [enDict, setEnDict] = useState<Translations | null>(cachedEn);

  useEffect(() => {
    if (lang === "en" && !enDict) {
      loadEn().then(setEnDict);
    }
  }, [lang, enDict]);

  const setLang = (l: Language) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
    if (l === "en" && !enDict) loadEn().then(setEnDict);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = lang === "en" && enDict ? enDict : ro;

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

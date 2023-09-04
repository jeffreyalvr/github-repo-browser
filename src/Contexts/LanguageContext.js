import { createContext, useContext } from "react";

export const LanguageContext = createContext({
  lang: "",
  setLang: () => {},
});

export const useLanguageContext = () => useContext(LanguageContext);

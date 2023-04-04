import { createContext, useContext } from "react";

export type ILangContext = {
  lang: string;
  setLang: (c: string) => void;
};

export const LanguageContext = createContext<ILangContext>({
  lang: "",
  setLang: () => {},
});

export const useLanguageContext = () => useContext(LanguageContext);

import { useState, useEffect } from "react";
import { LanguageContext } from "./Contexts/LanguageContext";

import AppRoutes from "./routes";

import "./App.css";

const App = () => {
  /* INFO: pt-br || en-ca */
  const [lang, setLang] = useState(localStorage.getItem("lang") || "pt-br");

  useEffect(() => {
    handleLocalStorage(lang);
  }, [lang]);

  const handleLocalStorage = (language) => {
    localStorage.setItem("lang", language);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <AppRoutes />;
    </LanguageContext.Provider>
  );
};

export default App;

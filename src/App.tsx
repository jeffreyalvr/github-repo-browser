import { useState } from "react";
import { LanguageContext } from "./Contexts/LanguageContext";

import AppRoutes from "./routes";

import "./App.css";

const App = () => {
  const [lang, setLang] = useState("pt-br"); /* INFO: pt-br || en-ca */
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <AppRoutes />;
    </LanguageContext.Provider>
  );
};

export default App;

import { useContext } from "react";
import { LanguageContext } from "../../Contexts/LanguageContext";

import "./styles.css";

import github_logo from "../../assets/images/github-logo.png";
import brazil_flag from "../../assets/images/icons/brazil_flag.png";
import canada_flag from "../../assets/images/icons/canada_flag.png";

type Props = {
  size: string;
};

const Header = (props: Props) => {
  const { setLang } = useContext(LanguageContext);

  return (
    <header className={`${props.size}`}>
      <div className={"github-logo"}>
        <img src={github_logo} alt="GitHub Logo" />
      </div>
      <div className="title">
        GitHub Repo Browser
        <div className="languages">
          <div
            className="item"
            title="Alterar para o Português"
            onClick={() => setLang("pt-br")}
          >
            <img src={brazil_flag} alt="PT-BR" />
          </div>
          <div
            className="item"
            title="Switch to English"
            onClick={() => setLang("en-ca")}
          >
            <img src={canada_flag} alt="EN-CA" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

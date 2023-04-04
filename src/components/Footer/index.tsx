import { useContext } from "react";
import { LanguageContext } from "../../Contexts/LanguageContext";

import "./styles.css";

import book from "../../language/book.json";

const Footer = () => {
  const { lang } = useContext(LanguageContext);

  return (
    <footer>
      <span>
        {lang === "pt-br"
          ? book.pt_br.FooterComponent.footer_span
          : book.en_ca.FooterComponent.footer_span}{" "}
        <a
          href="https://github.com/jeffreyalvr"
          target="_blank"
          rel="noopener noreferrer"
          title={
            lang === "pt-br"
              ? book.pt_br.FooterComponent.footer_link_title
              : book.en_ca.FooterComponent.footer_link_title
          }
        >
          @jeffreyalvr
        </a>
      </span>
      <p className="disclaimer">
        {lang === "pt-br"
          ? book.pt_br.FooterComponent.footer_disclaimer_p1
          : book.en_ca.FooterComponent.footer_disclaimer_p1}
      </p>
      <p className="disclaimer">
        {lang === "pt-br"
          ? book.pt_br.FooterComponent.footer_disclaimer_p2
          : book.en_ca.FooterComponent.footer_disclaimer_p2}
      </p>
    </footer>
  );
};

export default Footer;

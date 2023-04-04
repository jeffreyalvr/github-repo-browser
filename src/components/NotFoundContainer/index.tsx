import { useContext } from "react";
import { LanguageContext } from "../../Contexts/LanguageContext";

import { useNavigate } from "react-router-dom";

import book from "../../language/book.json";

import switch_icon from "../../assets/images/icons/switch.png";

import "./styles.css";

const NotFoundContainer = () => {
  let navigate = useNavigate();

  const { lang } = useContext(LanguageContext);

  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  return (
    <div className="box-container">
      <h1>
        {lang === "pt-br"
          ? book.pt_br.NotFoundContainer.index.box_container
          : book.en_ca.NotFoundContainer.index.box_container}
      </h1>

      <div className="box-description">
        <p>
          {lang === "pt-br"
            ? book.pt_br.NotFoundContainer.index
                .box_container_box_description_p1
            : book.en_ca.NotFoundContainer.index
                .box_container_box_description_p1}
        </p>
        <p>
          {lang === "pt-br"
            ? book.pt_br.NotFoundContainer.index
                .box_container_box_description_p2
            : book.en_ca.NotFoundContainer.index
                .box_container_box_description_p2}
        </p>
      </div>

      <button className="btn-primary" onClick={routeChange}>
        <img src={switch_icon} />
        {lang === "pt-br"
          ? book.pt_br.NotFoundContainer.index.box_container_btn_primary
          : book.en_ca.NotFoundContainer.index.box_container_btn_primary}
      </button>
    </div>
  );
};

export default NotFoundContainer;

import { ChangeEvent, useState, useContext } from "react";
import { LanguageContext } from "../../Contexts/LanguageContext";

import { useNavigate } from "react-router-dom";

import book from "../../language/book.json";

import search_icon from "../../assets/images/icons/search.png";

import "./styles.css";

const SearchContainer = () => {
  const [username, setUsername] = useState("");
  const [hidden, setHidden] = useState(true);

  const { lang } = useContext(LanguageContext);

  let navigate = useNavigate();

  const handleTextInput = (e) => {
    setUsername(e.target.value.toLowerCase());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSearch = () => {
    !username ? showErrorMessage() : handleRouteChange();
  };

  const handleRouteChange = () => {
    let path = `/user/${username}`;
    navigate(path);
  };

  const showErrorMessage = () => {
    setHidden(false);
  };

  const closeErrorMessage = () => {
    setHidden(true);
  };

  return (
    <div className="search-container">
      <h1>
        {lang === "pt-br"
          ? book.pt_br.SearchContainer.index.search_container_h1
          : book.en_ca.SearchContainer.index.search_container_h1}
      </h1>

      <div className="textbox-area">
        <div className="textbox">
          <b>@</b>
          <input
            type="text"
            placeholder={
              lang === "pt-br"
                ? book.pt_br.SearchContainer.index.textbox_area_input
                : book.en_ca.SearchContainer.index.textbox_area_input
            }
            onChange={(e) => handleTextInput(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            defaultValue={username}
          />
        </div>
        <button className="btn-primary" onClick={handleSearch}>
          <img src={search_icon} />
          {lang === "pt-br"
            ? book.pt_br.SearchContainer.index
                .textbox_area_textbox_button_btn_primary
            : book.en_ca.SearchContainer.index
                .textbox_area_textbox_button_btn_primary}
        </button>
      </div>
      <div className={hidden ? "error-message hidden" : "error-message"}>
        {lang === "pt-br"
          ? book.pt_br.SearchContainer.index.error_message
          : book.en_ca.SearchContainer.index.error_message}
        <button
          onClick={closeErrorMessage}
          title={
            lang === "pt-br"
              ? book.pt_br.SearchContainer.index.error_message_button
              : book.en_ca.SearchContainer.index.error_message_button
          }
        >
          x
        </button>
      </div>
    </div>
  );
};

export default SearchContainer;

import React, { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { useNavigate } from "react-router-dom";

import search_icon from "../../assets/images/icons/search.png";

import "./styles.css";

const SearchContainer = () => {
  const [username, setUsername] = useState("");
  const [hidden, setHidden] = useState(true);

  let navigate = useNavigate();

  const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.toLowerCase());
  };

  const handleKeyDown = (e: KeyboardEventInit) => {
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
      <h1>Find everyone, here.</h1>

      <div className="textbox-area">
        <div className="textbox">
          <b>@</b>
          <input
            type="text"
            placeholder="Who are you looking for?"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInput(e)}
            onKeyDown={(e: ChangeEvent<HTMLInputElement>) => handleKeyDown(e)}
            defaultValue={username}
          />
        </div>
        <button className="btn-primary" onClick={handleSearch}>
          <img src={search_icon} />
          Search
        </button>
      </div>
      <div className={hidden ? "error-message hidden" : "error-message"}>
        The user input cannot be empty
        <button onClick={closeErrorMessage} title="Click to close">
          x
        </button>
      </div>
    </div>
  );
};

export default SearchContainer;

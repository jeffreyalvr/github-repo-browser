import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import search_icon from "../../assets/images/icons/search.png";

import "./styles.css";

const SearchContainer = () => {
  const [username, setUsername] = useState("");

  const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.toLowerCase());
  };

  let navigate = useNavigate();

  const routeChange = () => {
    let path = `/user/${username}`;

    navigate(path);
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
            defaultValue={username}
          />
        </div>
        <button className="btn-primary" onClick={routeChange}>
          <img src={search_icon} />
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchContainer;

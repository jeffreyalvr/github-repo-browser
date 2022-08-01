import search_icon from "../../assets/images/icons/search.png";

import "./styles.css";

const SearchContainer = () => (
  <div className="search-container">
    <h1>Find everyone, here.</h1>

    <div className="textbox-area">
      <div className="textbox">
        <b>@</b>
        <input type="text" placeholder="Who are you looking for?" />
      </div>
      <button className="btn-primary">
        <img src={search_icon} />
        Search
      </button>
    </div>
  </div>
);

export default SearchContainer;

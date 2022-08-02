import React, { useState, useEffect } from "react";

import arrow_icon from "../../../assets/images/icons/arrow.png";

import "../styles.css";

const ReposContainer = () => {
  const [repositories, setRepositories] = useState([
    "punkapi-api",
    "poscard-8",
    "python-mercadinho",
  ]);

  // useEffect(() => {}, []);

  return (
    <div className="repos-container">
      <h1>
        Repositories <b>({repositories.length})</b>
      </h1>

      {repositories.map((repos) => {
        return (
          <div className="repo-item" key="index">
            <div className="title">
              {repos}
              <button className="btn-arrow">
                <img src={arrow_icon} alt="Show details" title="Show details" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReposContainer;

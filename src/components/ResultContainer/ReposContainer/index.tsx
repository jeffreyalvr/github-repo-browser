import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import arrow_icon from "../../../assets/images/icons/arrow.png";
import external_link_icon from "../../../assets/images/icons/external_link.png";
import refresh_icon from "../../../assets/images/icons/refresh.png";
import description_icon from "../../../assets/images/icons/description.png";
import language_icon from "../../../assets/images/icons/language.png";
import forks_icon from "../../../assets/images/icons/forks.png";

import "../styles.css";

const ReposContainer = () => {
  const [repositories, setRepositories] = useState([]);
  const [username, setUsername] = useState("");

  let { name } = useParams();

  const getUsernameFromUrl = () => {
    setUsername(name!);
  };

  const toggleDetails = (selectedId: number) => {
    let repo = repositories.find((repo) => repo["id"] === selectedId);
    // console.log(repo["name"]);
  };

  const loadRepos = async () => {
    await axios
      .get(`https://api.github.com/users/${name}/repos`)
      .then((response) => {
        const data = response.data.map(
          ({
            id,
            name,
            language,
            html_url,
            description,
            forks_count,
          }: {
            id: number;
            name: string;
            language: string;
            html_url: string;
            description: string;
            forks_count: number;
          }) => {
            return {
              id,
              name,
              language,
              html_url,
              description,
              forks_count,
              showRepoDetails: false,
            };
          }
        );

        setRepositories(data);
      });
  };

  useEffect(() => {
    getUsernameFromUrl();
    loadRepos();
  }, []);

  return (
    <div className="repos-container">
      <div className="repos-header">
        <h1>
          Repositories <b>({repositories.length})</b>
          <button
            className="ml14"
            title="Click to refresh the user's repositories"
            onClick={loadRepos}
          >
            <img src={refresh_icon} />
            Refresh
          </button>
        </h1>

        <span>You are looking all the public repositories from {username}</span>
      </div>

      {repositories.map((repos) => (
        <div className="repo-item" key={repos["id"]}>
          <div className="title">
            {repos["name"]}{" "}
            <button
              className="btn-arrow"
              title="Show details"
              onClick={() => toggleDetails(repos["id"])}
            >
              <img src={arrow_icon} />
            </button>
          </div>

          {repos["showRepoDetails"] ? (
            <div className="details">
              <div className="left-detail-panel">
                <span>
                  <b>
                    <img src={description_icon} />
                    Description:{" "}
                  </b>
                  {repos["description"] || "Not provided"}
                </span>
                <span>
                  <b>
                    <img src={language_icon} />
                    Language:{" "}
                  </b>
                  {repos["language"]}
                </span>
                <span>
                  <b>
                    <img src={forks_icon} />
                    Forks:{" "}
                  </b>
                  {repos["forks_count"]}
                </span>
              </div>

              <div className="right-detail-panel">
                <a
                  href={repos["html_url"]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn-primary" title="Open in GitHub">
                    <img src={external_link_icon} />
                    Open in GitHub
                  </button>
                </a>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default ReposContainer;

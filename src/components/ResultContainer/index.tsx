import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import arrow_icon from "../../assets/images/icons/arrow.png";
import external_link_icon from "../../assets/images/icons/external_link.png";
import refresh_icon from "../../assets/images/icons/refresh.png";
import description_icon from "../../assets/images/icons/description.png";
import language_icon from "../../assets/images/icons/language.png";
import forks_icon from "../../assets/images/icons/forks.png";
import switch_icon from "../../assets/images/icons/switch.png";

import loading_icon from "../../assets/images/icons/loading.gif";

import "./styles.css";

const ResultContainer = () => {
  const [repositories, setRepositories] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState({});
  const [usernameExists, setUsernameExists] = useState(false);
  const [publicRepos, setPublicRepos] = useState(0);
  const [loading, setLoading] = useState(true);

  let { name } = useParams();
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  const toggleDetails = (selectedId: number) => {
    let repo = repositories.find((repo) => repo["id"] === selectedId);
    // console.log(repo["username"]);
  };

  const checkUsername = async () => {
    await axios
      .get(`https://api.github.com/users/${name}`)
      .then((response) => {
        setUsernameExists(true);
        setAvatarUrl(response.data.avatar_url);
        setPublicRepos(response.data.public_repos);
        loadRepos();
      })
      .catch((err) => {
        setUsernameExists(false);
        setPublicRepos(0);
        setError(err);
        userNotFound();
      });
  };

  const userNotFound = () => {
    setLoading(false);
    let path = "/404";
    navigate(path);
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
              showRepoDetails: true,
            };
          }
        );

        setLoading(false);
        setRepositories(data);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    setLoading(true);
    checkUsername();
  }, []);

  return loading ? (
    <h1 className="label-loading">
      <img src={loading_icon} />
      Loading...
    </h1>
  ) : (
    <div className="result-wrapper">
      <div className="repos-container">
        <div className="repos-header">
          <div className="inline-block">
            <h1>
              Repositories <b>({publicRepos})</b>
            </h1>
            <button
              className="ml14"
              title="Click to refresh the user's repositories"
              onClick={loadRepos}
            >
              <img src={refresh_icon} />
              Refresh
            </button>
          </div>

          <span>You are looking all the public repositories from {name}.</span>
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

      <div className="user-container">
        <div className="profile-pic">
          <img src={avatarUrl} alt={`${name}'s avatar`} />
        </div>
        <p>@{name}</p>

        <a
          href={`https://github.com/${name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="btn-primary">
            <img src={external_link_icon} />
            Open profile in GitHub
          </button>
        </a>

        <button onClick={routeChange}>
          <img src={switch_icon} />
          Look for someone else
        </button>
      </div>
    </div>
  );
};

export default ResultContainer;

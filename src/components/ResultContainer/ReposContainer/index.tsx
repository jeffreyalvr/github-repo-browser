import axios from "axios";
import React, { useState, useEffect } from "react";

import arrow_icon from "../../../assets/images/icons/arrow.png";

import "../styles.css";

const ReposContainer = () => {
  const [repositories, setRepositories] = useState([]);
  const [username, setUsername] = useState("matheusunitt");

  useEffect(() => {
    const loadRepos = async () => {
      await axios
        .get(`https://api.github.com/users/${username}/repos`)
        .then((response) => {
          const data = response.data.map(
            ({
              id,
              name,
              language,
              updated_at,
              html_url,
              created_at,
              description,
              forks_count,
            }: {
              id: number;
              name: string;
              language: string;
              updated_at: string[];
              html_url: string;
              created_at: string;
              description: string;
              forks_count: number;
            }) => {
              return {
                id,
                name,
                language,
                updated_at,
                html_url,
                created_at,
                description,
                forks_count,
              };
            }
          );

          setRepositories(data);
          console.log(data);
        });
    };

    loadRepos();
  }, []);

  return (
    <div className="repos-container">
      <h1>
        Repositories <b>({repositories.length})</b>
      </h1>

      {repositories.map((repo) => (
        <div className="repo-item">
          <div className="title">
            {repo["name"]}{" "}
            <button className="btn-arrow" title="Show details">
              <img src={arrow_icon} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReposContainer;

import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageContext } from "../../Contexts/LanguageContext";

import axios from "axios";

import book from "../../language/book.json";

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
  const [pagesTotal, setPagesTotal] = useState([1, 1, 1, 1, 1]); // TODO: convert to number instead of array
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  let { name } = useParams();
  let navigate = useNavigate();

  const { lang } = useContext(LanguageContext);

  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  const changeCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    loadRepos();
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
    setLoading(true);
    await axios
      .get(`https://api.github.com/users/${name}/repos?page=${currentPage}`)
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
    checkUsername();
  }, []);

  return loading ? (
    <h1 className="label-loading">
      <img src={loading_icon} />
      {lang === "pt-br"
        ? book.pt_br.ResultContainer.index.label_loading
        : book.en_ca.ResultContainer.index.label_loading}
    </h1>
  ) : (
    <div className="result-wrapper">
      <div className="repos-container">
        <div className="repos-header">
          <div className="inline-block">
            <h1>
              {lang === "pt-br"
                ? book.pt_br.ResultContainer.index.result_wrapper_h1
                : book.en_ca.ResultContainer.index.result_wrapper_h1}
              <b>({publicRepos})</b>
            </h1>
            <button
              className="ml14 mh-40"
              title={
                lang === "pt-br"
                  ? book.pt_br.ResultContainer.index.result_wrapper_button_title
                  : book.en_ca.ResultContainer.index.result_wrapper_button_title
              }
              onClick={loadRepos}
            >
              <img src={refresh_icon} />
              {lang === "pt-br"
                ? book.pt_br.ResultContainer.index.result_wrapper_button
                : book.en_ca.ResultContainer.index.result_wrapper_button}
            </button>
          </div>

          <span>
            {lang === "pt-br"
              ? book.pt_br.ResultContainer.index
                  .result_wrapper_repos_header_span
              : book.en_ca.ResultContainer.index
                  .result_wrapper_repos_header_span}{" "}
            {name}.
          </span>
        </div>
        {pagesTotal.length > 1 ? (
          <div className="repos-pagination">
            {pagesTotal.map((page, i) => (
              <button
                className={currentPage === i + 1 ? "btn-secondary" : ""}
                onClick={() => changeCurrentPage(i + 1)}
                key={i + 1}
              >
                {i + 1}
              </button>
            ))}
          </div>
        ) : (
          <div className="mb50"></div>
        )}
        {repositories.map((repos) => (
          <div className="repo-item" key={repos["id"]}>
            <div className="title">
              {repos["name"]}{" "}
              <button
                className="btn-arrow"
                title={
                  lang === "pt-br"
                    ? book.pt_br.ResultContainer.index.repo_item_show_details
                    : book.en_ca.ResultContainer.index.repo_item_show_details
                }
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
                      {lang === "pt-br"
                        ? book.pt_br.ResultContainer.index
                            .repo_item_left_detail_panel_description
                        : book.en_ca.ResultContainer.index
                            .repo_item_left_detail_panel_description}{" "}
                    </b>
                    {repos["description"] || lang === "pt-br"
                      ? book.pt_br.ResultContainer.index
                          .repo_item_left_detail_panel_not_provided
                      : book.en_ca.ResultContainer.index
                          .repo_item_left_detail_panel_not_provided}
                  </span>
                  <span>
                    <b>
                      <img src={language_icon} />
                      {lang === "pt-br"
                        ? book.pt_br.ResultContainer.index
                            .repo_item_left_detail_panel_language
                        : book.en_ca.ResultContainer.index
                            .repo_item_left_detail_panel_language}{" "}
                    </b>
                    {repos["language"] || lang === "pt-br"
                      ? book.pt_br.ResultContainer.index
                          .repo_item_left_detail_panel_not_provided
                      : book.en_ca.ResultContainer.index
                          .repo_item_left_detail_panel_not_provided}
                  </span>
                  <span>
                    <b>
                      <img src={forks_icon} />
                      {lang === "pt-br"
                        ? book.pt_br.ResultContainer.index
                            .repo_item_left_detail_panel_forks
                        : book.en_ca.ResultContainer.index
                            .repo_item_left_detail_panel_forks}{" "}
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
                    <button className="btn-primary">
                      <img src={external_link_icon} />
                      {lang === "pt-br"
                        ? book.pt_br.ResultContainer.index
                            .btn_primary_open_github
                        : book.en_ca.ResultContainer.index
                            .btn_primary_open_github}
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
          <img src={avatarUrl} alt={`${name}`} />
        </div>
        <div className="profile-details">
          <p>@{name}</p>

          <a
            href={`https://github.com/${name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-primary">
              <img src={external_link_icon} />
              {lang === "pt-br"
                ? book.pt_br.ResultContainer.index.btn_primary_open_github
                : book.en_ca.ResultContainer.index.btn_primary_open_github}
            </button>
          </a>

          <button onClick={routeChange}>
            <img src={switch_icon} />
            {lang === "pt-br"
              ? book.pt_br.ResultContainer.index
                  .repo_item_user_container_btn_look_for_somebody_else
              : book.en_ca.ResultContainer.index
                  .repo_item_user_container_btn_look_for_somebody_else}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultContainer;

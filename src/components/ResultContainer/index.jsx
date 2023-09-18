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
import topics_icon from "../../assets/images/icons/topics.png";
import stars_icon from "../../assets/images/icons/stars.png";
import watchers_icon from "../../assets/images/icons/watchers.png";
import license_icon from "../../assets/images/icons/license.png";
import followers_icon from "../../assets/images/icons/followers.png";
import updated_at_icon from "../../assets/images/icons/updated_at.png";
import created_at_icon from "../../assets/images/icons/created_at.png";
import switch_icon from "../../assets/images/icons/switch.png";
import loading_icon from "../../assets/images/icons/loading.gif";

import previous_page_icon from "../../assets/images/icons/arrow_left.png";
import next_page_icon from "../../assets/images/icons/arrow_right.png";

import "./styles.css";

const ResultContainer = () => {
  const [repositories, setRepositories] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [followers, setFollowers] = useState(0);
  const [followersFixed, setFollowersFixed] = useState(0);
  const [error, setError] = useState({});
  const [publicRepos, setPublicRepos] = useState(0);
  const [pagesTotal, setPagesTotal] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortType, setSortType] = useState("updated");
  const [pagesArray, setPagesArray] = useState([]);

  let { name } = useParams();
  let navigate = useNavigate();

  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    checkUsername();
  }, []);

  useEffect(() => {
    let number = 0;

    if (followers >= 1000000) {
      number = (followers / 1000000).toFixed(1) + "M";
    } else if (followers >= 1000) {
      number = (followers / 1000).toFixed(1) + "K";
    } else {
      number = followers.toString();
    }

    setFollowersFixed(number);
  }, [followers]);

  useEffect(() => {
    loadRepos();
  }, [sortType, itemsPerPage, currentPage]);

  useEffect(() => {
    if (currentPage === pagesTotal) return;

    let array = [];

    for (let current = currentPage; current < currentPage + 5; current++) {
      array.push(current);
    }

    array = array.filter((n) => n < pagesTotal);

    setPagesArray(array);
  }, [currentPage]);

  const handlePreviousPage = () => {
    changeCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    changeCurrentPage(currentPage + 1);
  };

  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  const changeCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleDetails = (selectedId) => {
    let novaLista = [...repositories];

    const repoById = novaLista.find((repo) => repo.id === selectedId);
    repoById.toggleStatus = !repoById.toggleStatus;

    setRepositories(novaLista);
  };

  const checkUsername = () => {
    axios
      .get(`https://api.github.com/users/${name}`)
      .then((response) => {
        setAvatarUrl(response.data.avatar_url);
        setFollowers(response.data.followers);
        setPublicRepos(response.data.public_repos);
        loadRepos();
      })
      .catch((err) => {
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

    const response = await axios.get(
      `https://api.github.com/users/${name}/repos?page=${currentPage}&sort=${sortType}&per_page=${itemsPerPage}`
    );

    const filteredData = response.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      language: repo.language,
      html_url: repo.html_url,
      topics: repo.topics,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      topics: repo.topics,
      stars: repo.stargazers_count,
      updated_at: repo.updated_at,
      created_at: repo.created_at,
      license: repo.license?.name,
      description: repo.description,
      toggleStatus: false,
    }));

    setLoading(false);
    setRepositories(filteredData);
  };

  const handleItemsPerPage = (e) => {
    const value = Number(e.target.value);
    setItemsPerPage(value);
  };

  const handleSort = (e) => {
    const value = String(e.target.value);
    setSortType(value);
  };

  const handleFormatDate = (date_string) => {
    const to_date = new Date(date_string);
    const options = { year: "numeric", month: "short", day: "2-digit" };

    return to_date.toLocaleDateString(lang, options);
  };

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

        <div className="repos-nav-container">
          {pagesTotal > 1 ? (
            <div className="repos-pagination">
              {currentPage > 5 && (
                <>
                  <button onClick={() => changeCurrentPage(1)}>
                    {lang === "pt-br"
                      ? book.pt_br.ResultContainer.index
                          .repo_pagination_button_first_page
                      : book.en_ca.ResultContainer.index
                          .repo_pagination_button_first_page}
                  </button>

                  <button
                    className="arrow-btn"
                    onClick={() => handlePreviousPage()}
                  >
                    <img
                      src={previous_page_icon}
                      alt={
                        lang === "pt-br"
                          ? book.pt_br.ResultContainer.index
                              .repo_pagination_button_previous_page
                          : book.en_ca.ResultContainer.index
                              .repo_pagination_button_previous_page
                      }
                    />
                  </button>
                </>
              )}

              {pagesArray.map((number) => {
                return (
                  <button
                    className={number === currentPage ? "active" : undefined}
                    onClick={() => changeCurrentPage(number)}
                    key={number.toString()}
                  >
                    {number.toString()}
                  </button>
                );
              })}

              {currentPage < pagesTotal && (
                <button className="arrow-btn" onClick={() => handleNextPage()}>
                  <img
                    src={next_page_icon}
                    alt={
                      lang === "pt-br"
                        ? book.pt_br.ResultContainer.index
                            .repo_pagination_button_next_page
                        : book.en_ca.ResultContainer.index
                            .repo_pagination_button_next_page
                    }
                  />
                </button>
              )}

              {/* exibe que existem mais itens entre o 5 item da lista de páginas e a última página */}
              {pagesArray[pagesArray.length - 1] < pagesTotal - 1 && (
                <span>&bull;&bull;&bull;</span>
              )}

              {/* botão da última página da lista */}
              <button
                className={currentPage === pagesTotal ? "active" : undefined}
                onClick={() => changeCurrentPage(pagesTotal)}
              >
                {pagesTotal}
              </button>
            </div>
          ) : (
            <div className="mb50"></div>
          )}

          <div className="repos-filters">
            <div className="repos-filter-item">
              <span>
                {lang === "pt-br"
                  ? book.pt_br.ResultContainer.index.repo_filters_sort_by_text
                  : book.en_ca.ResultContainer.index.repo_filters_sort_by_text}
              </span>
              <select value={sortType} onChange={(e) => handleSort(e)}>
                <option value="full_name">
                  {lang === "pt-br"
                    ? book.pt_br.ResultContainer.index.repo_filters_sort_by_name
                    : book.en_ca.ResultContainer.index
                        .repo_filters_sort_by_name}
                </option>
                <option value="updated">
                  {lang === "pt-br"
                    ? book.pt_br.ResultContainer.index
                        .repo_filters_sort_by_updated_date
                    : book.en_ca.ResultContainer.index
                        .repo_filters_sort_by_updated_date}
                </option>
                <option value="created">
                  {lang === "pt-br"
                    ? book.pt_br.ResultContainer.index
                        .repo_filters_sort_by_created_date
                    : book.en_ca.ResultContainer.index
                        .repo_filters_sort_by_created_date}
                </option>
              </select>
            </div>

            <div className="repos-filter-item">
              <span>
                {lang === "pt-br"
                  ? book.pt_br.ResultContainer.index.repo_filters_per_page_text
                  : book.en_ca.ResultContainer.index.repo_filters_per_page_text}
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPage(e)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
            </div>
          </div>
        </div>

        {repositories.map((repos) => (
          <div className="repo-item" key={repos.id}>
            <div className="header">
              <div className="title">
                {repos.name}
                <button
                  className="btn-arrow"
                  title={
                    lang === "pt-br"
                      ? book.pt_br.ResultContainer.index.repo_item_show_details
                      : book.en_ca.ResultContainer.index.repo_item_show_details
                  }
                  onClick={() => toggleDetails(repos.id)}
                >
                  <img
                    src={arrow_icon}
                    className={repos.toggleStatus ? "arrow-turn" : undefined}
                  />
                </button>
              </div>
              <div className="title-details">
                {sortType === "created" ? (
                  <>
                    <img src={created_at_icon} />
                    <span
                      className="date"
                      title={
                        lang === "pt-br"
                          ? book.pt_br.ResultContainer.index
                              .repo_item_created_at_title
                          : book.en_ca.ResultContainer.index
                              .repo_item_created_at_title
                      }
                    >
                      {handleFormatDate(repos.created_at)}
                    </span>
                  </>
                ) : (
                  <>
                    <img src={updated_at_icon} />
                    <span
                      className="date"
                      title={
                        lang === "pt-br"
                          ? book.pt_br.ResultContainer.index
                              .repo_item_updated_at_title
                          : book.en_ca.ResultContainer.index
                              .repo_item_updated_at_title
                      }
                    >
                      {handleFormatDate(repos.updated_at)}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div
              className={`details ${repos.toggleStatus ? undefined : "hidden"}`}
            >
              <div className="left-detail-panel">
                <span className="description-item">
                  <b>
                    <img src={description_icon} />
                    {lang === "pt-br"
                      ? book.pt_br.ResultContainer.index
                          .repo_item_left_detail_panel_description
                      : book.en_ca.ResultContainer.index
                          .repo_item_left_detail_panel_description}{" "}
                  </b>
                  {repos.description
                    ? repos.description
                    : lang === "pt-br"
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
                  {repos.language
                    ? repos.language
                    : lang === "pt-br"
                    ? book.pt_br.ResultContainer.index
                        .repo_item_left_detail_panel_not_provided
                    : book.en_ca.ResultContainer.index
                        .repo_item_left_detail_panel_not_provided}
                </span>
                {repos.license ? (
                  <span>
                    <b>
                      <img src={license_icon} />
                      {lang === "pt-br"
                        ? book.pt_br.ResultContainer.index
                            .repo_item_left_detail_panel_license
                        : book.en_ca.ResultContainer.index
                            .repo_item_left_detail_panel_license}{" "}
                    </b>
                    {repos.license}
                  </span>
                ) : undefined}
                {repos.stars > 0 ? (
                  <span>
                    <b>
                      <img src={stars_icon} />
                      {lang === "pt-br"
                        ? book.pt_br.ResultContainer.index
                            .repo_item_left_detail_panel_stars
                        : book.en_ca.ResultContainer.index
                            .repo_item_left_detail_panel_stars}{" "}
                    </b>
                    {repos.stars}
                  </span>
                ) : undefined}
                {repos.watchers ? (
                  <span>
                    <b>
                      <img src={watchers_icon} />
                      {lang === "pt-br"
                        ? book.pt_br.ResultContainer.index
                            .repo_item_left_detail_panel_watchers
                        : book.en_ca.ResultContainer.index
                            .repo_item_left_detail_panel_watchers}{" "}
                    </b>
                    {repos.watchers}
                  </span>
                ) : undefined}
                {repos.forks ? (
                  <span>
                    <b>
                      <img src={forks_icon} />
                      {lang === "pt-br"
                        ? book.pt_br.ResultContainer.index
                            .repo_item_left_detail_panel_forks
                        : book.en_ca.ResultContainer.index
                            .repo_item_left_detail_panel_forks}{" "}
                    </b>
                    {repos.forks}
                  </span>
                ) : undefined}
                {repos.topics.length > 0 ? (
                  <span>
                    <b>
                      <img src={topics_icon} />
                      {lang === "pt-br"
                        ? book.pt_br.ResultContainer.index
                            .repo_item_left_detail_panel_topics
                        : book.en_ca.ResultContainer.index
                            .repo_item_left_detail_panel_topics}{" "}
                    </b>
                    <div className="topics-row">
                      {repos.topics.map((topic, i) => (
                        <div className="topic" key={i}>
                          {topic}
                        </div>
                      ))}
                    </div>
                  </span>
                ) : undefined}
              </div>

              <div className="right-detail-panel">
                <a
                  href={repos.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn-primary">
                    <img src={external_link_icon} />
                    {lang === "pt-br"
                      ? book.pt_br.ResultContainer.index.btn_primary_open_github
                      : book.en_ca.ResultContainer.index
                          .btn_primary_open_github}
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="user-container">
        <div className="profile-pic">
          <img className="avatar" src={avatarUrl} alt={`${name}`} />
        </div>
        <div className="user-details">
          <p>@{name}</p>
          <span>
            <img src={followers_icon} />
            <b>{followersFixed}</b>{" "}
            {lang === "pt-br"
              ? book.pt_br.ResultContainer.index.user_container_followers
              : book.en_ca.ResultContainer.index.user_container_followers}
          </span>
        </div>
        <div className="profile-details">
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

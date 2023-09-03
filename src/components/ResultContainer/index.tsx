import { useState, useEffect, useContext, SetStateAction } from "react";
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

import previous_page_icon from "../../assets/images/icons/arrow_left.png";
import next_page_icon from "../../assets/images/icons/arrow_right.png";

import "./styles.css";

const ResultContainer = () => {
  const [repositories, setRepositories] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState({});
  const [usernameExists, setUsernameExists] = useState(false);
  const [publicRepos, setPublicRepos] = useState(0);
  const [pagesTotal, setPagesTotal] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pagesArray, setPagesArray] = useState<number[]>([]);

  let { name } = useParams();
  let navigate = useNavigate();

  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    checkUsername();
  }, []);

  useEffect(() => {
    loadRepos();
  }, [itemsPerPage, currentPage]);

  useEffect(() => {
    if (currentPage === pagesTotal) return;

    let array: Array<number> = [];

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

  const changeCurrentPage = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const toggleDetails = (selectedId: number) => {
    let novaLista = [...repositories];

    const repoById = novaLista.filter((repo) => repo["id"] === selectedId);
    // repoById["toggleStatus"] = !repoById["toggleStatus"];
    console.log(...repoById);

    setRepositories(novaLista);
  };

  const checkUsername = () => {
    axios
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

    const response = await axios.get(
      `https://api.github.com/users/${name}/repos?page=${currentPage}&per_page=${itemsPerPage}`
    );

    const filteredData = response.data.map(
      (repo: {
        id: number;
        name: string;
        language: string;
        html_url: string;
        description: string;
        forks_count: number;
        toggleStatus: boolean;
      }) => ({
        id: repo.id,
        name: repo.name,
        language: repo.language,
        html_url: repo.html_url,
        description: repo.description,
        forks_count: repo.forks_count,
        toggleStatus: false,
      })
    );

    setLoading(false);
    setRepositories(filteredData);
  };

  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setItemsPerPage(value);
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
                  <button onClick={() => changeCurrentPage(1)}>Início</button>

                  <button
                    className="arrow-btn"
                    onClick={() => handlePreviousPage()}
                  >
                    <img src={previous_page_icon} alt="Anterior" />
                  </button>
                </>
              )}

              {pagesArray.map((number: number) => {
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
                  <img src={next_page_icon} alt="Próxima" />
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

          <div className="repos-per-page">
            <span>Itens por página</span>
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

        {repositories.map((repos) => (
          <div className="repo-item" key={repos["id"]}>
            <div className="title">
              {repos["name"]}
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

            <div
              className={`details ${
                repos["toggleStatus"] ? undefined : "hidden"
              }`}
            >
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
                  {lang === "pt-br"
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
                  {lang === "pt-br"
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
          <img src={avatarUrl} alt={`${name}`} />
          <p>@{name}</p>
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

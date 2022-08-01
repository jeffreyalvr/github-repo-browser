import github_logo from "../../assets/images/github-logo.png";

import "./styles.css";

interface Props {
  size: string;
}

const Header = (props: Props) => (
  <header className={`${props.size}`}>
    <div className={"github-logo"}>
      <img src={github_logo} alt="GitHub Logo" />
    </div>
    <div className="title">GitHub Repo Browser</div>
  </header>
);

export default Header;

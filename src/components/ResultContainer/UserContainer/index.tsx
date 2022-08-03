import external_link_icon from "../../../assets/images/icons/external_link.png";
import switch_icon from "../../../assets/images/icons/switch.png";

import { useNavigate } from "react-router-dom";

import "../styles.css";

interface URLProps {
  name: string;
  profile_pic: string;
}

const UserContainer = (props: URLProps) => {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  return (
    <div className="user-container">
      <div className="profile-pic">
        <img src={`${props.profile_pic}`} alt={`${props.name}'s avatar`} />
      </div>
      <p>@{props.name}</p>

      <a
        href={`https://github.com/${props.name}`}
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
  );
};

export default UserContainer;

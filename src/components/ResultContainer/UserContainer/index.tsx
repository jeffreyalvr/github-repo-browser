import external_link_icon from "../../../assets/images/icons/external_link.png";
import switch_icon from "../../../assets/images/icons/switch.png";

import { useNavigate, Link } from "react-router-dom";

import "../styles.css";

const UserContainer = () => {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  return (
    <div className="user-container">
      <div className="profile-pic">
        <img
          src="https://media-exp1.licdn.com/dms/image/C4E03AQHImwgrtQYQZQ/profile-displayphoto-shrink_800_800/0/1585886879084?e=1665014400&v=beta&t=eLFMGPucO8dpjuDH83LUfiRIxsSSoD_LbYALI2bgUe4"
          alt="jeffreyalvr's avatar"
        />
      </div>
      <p>@jeffreyalvr</p>

      <a
        href="https://github.com/matheusunitt"
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

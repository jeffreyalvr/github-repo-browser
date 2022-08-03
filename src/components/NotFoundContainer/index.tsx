import { Navigate, useNavigate } from "react-router-dom";

import switch_icon from "../../assets/images/icons/switch.png";

import "./styles.css";

const NotFoundContainer = () => {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  return (
    <div className="box-container">
      <h1>I'm sorry, but...</h1>

      <div className="box-description">
        <p>The user you've entered couldn't be found.</p>
        <p>Did you type the name correctly?</p>
      </div>

      <button className="btn-primary" onClick={routeChange}>
        <img src={switch_icon} />
        Look for someone else
      </button>
    </div>
  );
};

export default NotFoundContainer;

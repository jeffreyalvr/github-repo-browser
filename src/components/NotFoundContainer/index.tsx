import redo_icon from "../../assets/images/icons/redo.png";

import "./styles.css";

const NotFoundContainer = () => (
  <div className="box-container">
    <h1>I'm sorry, but...</h1>

    <div className="box-description">
      <p>The user you've entered couldn't be found.</p>
      <p>Did you type the name correctly?</p>
    </div>

    <button className="btn-primary">
      <img src={redo_icon} />
      Look for someone else
    </button>
  </div>
);

export default NotFoundContainer;

import React from "react";

import "./styles.css";

type Children = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Children) => (
  <div className="wrapper">{children}</div>
);

export default Wrapper;

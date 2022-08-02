import React from "react";

import "../styles.css";

interface Children {
  children: React.ReactNode;
}

const ResultContainerWrapper = ({ children }: Children) => (
  <div className="result-wrapper">{children}</div>
);

export default ResultContainerWrapper;

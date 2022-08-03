import React from "react";

import "./styles.css";

type Children = {
  children: React.ReactNode;
};

const Main = ({ children }: Children) => <main>{children}</main>;

export default Main;

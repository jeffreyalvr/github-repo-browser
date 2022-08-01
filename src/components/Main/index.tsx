import React from "react";

import "./styles.css";

interface Children {
  children: React.ReactNode;
}

const Main = ({ children }: Children) => <main>{children}</main>;

export default Main;

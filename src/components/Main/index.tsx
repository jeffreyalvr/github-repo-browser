import React from "react";

import "./styles.css";

type Children = {
  children: React.ReactNode;
};

const Main = ({ children }: Children) => (
  <main className="move-up">{children}</main>
);

export default Main;

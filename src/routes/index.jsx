import { BrowserRouter, useRoutes } from "react-router-dom";

import Home from "../pages/Home";
import RepoViewer from "../pages/RepoViewer";
import NotFound from "../pages/NotFound";

const RoutePaths = () =>
  useRoutes([
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/user/:name", element: <RepoViewer /> },
    { path: "/404", element: <NotFound /> },
    { path: "*", element: <NotFound /> },
  ]);

const AppRoutes = () => (
  <BrowserRouter>
    <RoutePaths />
  </BrowserRouter>
);

export default AppRoutes;

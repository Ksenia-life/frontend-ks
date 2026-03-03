import { createBrowserRouter } from "react-router-dom";

import App from "./containers/App";
import Home from "./containers/Home";

import Posts from "./containers/Posts/Posts";
import Persons from "./containers/App/Persons/Persons";
import FilmsSearch from "./containers/App/FilmsSearch/FilmsSearch";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "posts", Component: Posts },
      { path: "persons", Component: Persons },
      { path: "search", Component: FilmsSearch },
    ],
  },
]);
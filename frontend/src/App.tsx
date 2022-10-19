import "./App.css";

import React from "react";
import { Helmet } from "react-helmet";

import AppRoutes from "./app/AppRoutes";

function App() {
  return (
    <div className="App">
      <Helmet
        defaultTitle="React Boilerplate"
        titleTemplate="%s - React Boilerplate"
      >
        <meta content="A React Boilerplate application" name="description" />
      </Helmet>
      <AppRoutes />
    </div>
  );
}

export default App;

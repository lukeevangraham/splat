import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Projects from "./containers/Projects/Projects";
import Project from "./containers/Project/Project";

import "./App.css";

const App = () => {
  let routes = (
    <Switch>
      <Route path="/" exact component={Projects} />
      <Route path="/project/:id" exact component={Project} />
    </Switch>
  );
  return (
    <div className="bg-blue-500 h-screen">
      <div className="text-center text-2xl font-light bg-white bg-opacity-25 p-2.5 overflow-hidden mb-4">
        <div className="transform -skew-y-6 m-1">
          <span className="bg-white bg-opacity-70 p-1">Splat!</span>
          </div>
      </div>
      {routes}
    </div>
  );
};

export default withRouter(App);

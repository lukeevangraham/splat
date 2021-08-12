import React from "react";
import { Route, Switch, withRouter, Link } from "react-router-dom";
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
    <div className="h-screen">
      <div className="text-center text-2xl font-light bg-white bg-opacity-25 p-2.5 overflow-hidden mb-4">
        <div className="transform -skew-y-6 m-1">
          <Link to="/">
            <span className="bg-white bg-opacity-70 p-1">Splat!</span>
          </Link>
        </div>
      </div>
      {routes}
    </div>
  );
};

export default withRouter(App);

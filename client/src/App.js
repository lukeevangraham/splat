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
    <div>
      <div>Splat!</div>
      {routes}
    </div>
  );
};

export default withRouter(App);

import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./css/App.css";
import DisplayAllMovies from "./components/DisplayAllMovies";
import AddMovie from "./components/AddMovie";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={DisplayAllMovies} />
          <Route exact path="/DisplayAllMovies" component={DisplayAllMovies} />
          <Route exact path="/AddMovie" component={AddMovie} />
        </Switch>
      </BrowserRouter>
    );
  }
}

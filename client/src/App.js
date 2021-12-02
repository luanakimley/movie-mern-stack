import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./css/App.css";

import DisplayAllMovies from "./components/DisplayAllMovies";
import AddMovie from "./components/AddMovie";
import NavBar from "./components/NavBar";
import DeleteMovie from "./components/DeleteMovie";
import EditMovie from "./components/EditMovie";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={DisplayAllMovies} />
          <Route exact path="/Home" component={DisplayAllMovies} />
          <Route exact path="/AddMovie" component={AddMovie} />
          <Route exact path="/DeleteMovie/:id" component={DeleteMovie} />
          <Route exact path="/EditMovie/:id" component={EditMovie} />
        </Switch>
      </BrowserRouter>
    );
  }
}

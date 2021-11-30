import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <header id="header" className="fixed-top">
          <div className="container d-flex align-items-center justify-content-between">
            <h1 className="logo">Movies Collection</h1>
            <nav id="navbar" className="navbar">
              <ul>
                <li>
                  <Link to="/">
                    <a className="nav-link scrollto active">Home</a>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <a className="nav-link scrollto">Review</a>
                  </Link>
                </li>
                <i className="bi bi-list mobile-nav-toggle"></i>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    );
  }
}

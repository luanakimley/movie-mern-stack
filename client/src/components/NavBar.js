import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CameraReels } from "react-bootstrap-icons";

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
            <div className="d-flex flex-direction-row ">
              <CameraReels color="#123c69" size={40} />
              <h1 className="ml-3">Movies Collection</h1>
            </div>
            <nav id="navbar" className="navbar">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/">Review</Link>
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

import React, { Component } from "react";
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
          </div>
        </header>
      </div>
    );
  }
}

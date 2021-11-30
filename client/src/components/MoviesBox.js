import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MoviesBox extends Component {
  render() {
    return (
      <div
        className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0 position-relative"
        key={this.props.movie.id}
      >
        <div className="icon-box">
          <h4>{this.props.movie.title}</h4>
          <p>{this.props.movie.year}</p>
        </div>
      </div>
    );
  }
}

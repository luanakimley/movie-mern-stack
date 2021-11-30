import React, { Component } from "react";
import { Link } from "react-router-dom";
import MoviesBox from "./MoviesBox";

import axios from "axios";

import { SERVER_HOST } from "../config/global_constants";

export default class DisplayAllMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    axios.get(`${SERVER_HOST}/movies`).then((res) => {
      if (res.data) {
        if (res.data.errorMessage) {
          console.log(res.data.errorMessage);
        } else {
          console.log("Records read");
          this.setState({ movies: res.data });
        }
      } else {
        console.log("Record not found");
      }
    });
  }

  render() {
    return (
      <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative">
          <Link className="btn btn-primary" to={"/AddMovie"}>
            Add New Movie
          </Link>
          <div className="row icon-boxes">
            {this.state.movies.map((movie) => (
              <MoviesBox key={movie._id} movie={movie} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

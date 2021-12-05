import React, { Component } from "react";
import { Link } from "react-router-dom";
import MoviesBox from "./MoviesBox";
import { EmojiFrown } from "react-bootstrap-icons";

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
      <div className="container movies-container">
        <div className="movie-cont-head">
          <h2>All Movies</h2>
          <Link className="btn btn-light" to={"/AddMovie"}>
            Add New Movie
          </Link>
        </div>

        <div className="row icon-boxes">
          {this.state.movies.length > 0 ? (
            this.state.movies.map((movie) => (
              <MoviesBox key={movie._id} movie={movie} />
            ))
          ) : (
            <div className="text-center">
              <EmojiFrown className="mt-2" size="50" color="white" />
              <h3 className="mt-3 text-light">No records found</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

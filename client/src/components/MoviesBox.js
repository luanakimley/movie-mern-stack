import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Trash, Pencil } from "react-bootstrap-icons";

export default class MoviesBox extends Component {
  render() {
    return (
      <div className="d-flex position-relative" key={this.props.movie.id}>
        <div className="icon-box">
          <img
            src={this.props.movie.posterUrl}
            alt={this.props.movie.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://i.ibb.co/Fgv6xhb/image-not-available-png-8.png";
            }}
          />
          <div className="icon-box__text">
            <h3>
              {this.props.movie.title} ({this.props.movie.year})
            </h3>
            <p>
              {this.props.movie.runtime} min -
              {this.props.movie.genres.map((g, i, l) =>
                i + 1 === l.length ? <span> {g} </span> : <span> {g} |</span>
              )}
            </p>
            <p>{this.props.movie.plot}</p>
            <p>
              <b>Director: </b>
              {this.props.movie.director}
            </p>
            <p>
              <b>Actors: </b>
              {this.props.movie.actors}
            </p>
          </div>
          <div className="icon-box__icon">
            <Link to={"/EditMovie/" + this.props.movie._id}>
              <Pencil className="mr-2" color="#123c69" size={20} />
            </Link>
            <Link to={"/DeleteMovie/" + this.props.movie._id}>
              <Trash className="mr-1" color="#123c69" size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { XLg } from "react-bootstrap-icons";
import FileBase64 from "react-file-base64";

export default class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      year: "",
      runtime: "",
      genres: [],
      director: "",
      actors: "",
      plot: "",
      posterUrl: "",
      redirectToHome: false,
      selectedGenre: "",
    };
  }

  componentDidMount() {
    axios
      .get(`${SERVER_HOST}/movies/${this.props.match.params.id}`)
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            this.setState({
              title: res.data.title,
              year: res.data.year,
              runtime: res.data.runtime,
              genres: res.data.genres,
              director: res.data.director,
              actors: res.data.actors,
              plot: res.data.plot,
              posterUrl: res.data.posterUrl,
            });
          }
        } else {
          console.log(`Record not found`);
        }
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addGenre = (e) => {
    if (
      this.state.selectedGenre !== "" &&
      !this.state.genres.includes(this.state.selectedGenre)
    ) {
      this.setState({
        genres: [...this.state.genres, this.state.selectedGenre],
      });
    }
  };

  removeGenre = (e) => {
    this.setState({
      genres: this.state.genres.filter((g) => g !== e.currentTarget.dataset.id),
    });
  };

  validateTitle() {
    return this.state.title !== "";
  }

  validateYear() {
    const today = new Date();
    return this.state.year >= 1800 && this.state.year <= today.getFullYear();
  }

  validateRuntime() {
    return this.state.runtime > 0;
  }

  validateGenres() {
    return this.state.genres.length !== 0 && this.state.genres !== undefined;
  }

  validatePlot() {
    return this.state.plot !== "";
  }

  validateDirector() {
    return /^[a-zA-Z\s,]+$/.test(this.state.director);
  }

  validateActors() {
    return /^[a-zA-Z\s,]+$/.test(this.state.actors);
  }

  validate() {
    return {
      title: this.validateTitle(),
      year: this.validateYear(),
      runtime: this.validateYear(),
      genres: this.validateGenres(),
      plot: this.validatePlot(),
      director: this.validateDirector(),
      actors: this.validateActors(),
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const movieObject = {
      title: this.state.title,
      year: this.state.year,
      runtime: this.state.runtime,
      genres: this.state.genres,
      director: this.state.director,
      actors: this.state.actors,
      plot: this.state.plot,
      posterUrl: this.state.posterUrl,
    };

    axios
      .put(`${SERVER_HOST}/movies/${this.props.match.params.id}`, movieObject)
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            console.log("Record updated");
            Swal.fire({
              title: "Record updated",
              text: "The movie details have been updated.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            this.setState({ redirectToHome: true });
          }
        } else {
          console.log("Record not updated");
          Swal.fire({
            title: "Records Not Updated",
            text: "Make sure that data is valid and is not a duplicate.",
            icon: "error",
            confirmButtonColor: "#123c69",
            showConfirmButton: true,
          });
        }
      });
  };

  render() {
    const genres = [
      "Action",
      "Adventure",
      "Animation",
      "Biography",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Family",
      "Fantasy",
      "Film-Noir",
      "Game-Show",
      "History",
      "Horror",
      "Music",
      "Musical",
      "Mystery",
      "News",
      "Reality-TV",
      "Romance",
      "Sci-Fi",
      "Sport",
      "Talk-Show",
      "Thriller",
      "War",
      "Western",
    ];

    const formInputsState = this.validate();
    const inputsAreAllValid = Object.keys(formInputsState).every(
      (index) => formInputsState[index]
    );

    let titleError = "";
    let yearError = "";
    let runtimeError = "";
    let genresError = "";
    let plotError = "";
    let directorError = "";
    let actorsError = "";

    if (!this.validateTitle()) {
      titleError = <p className="text-danger mt-2">Title is required.</p>;
    }
    if (!this.validateYear()) {
      yearError = (
        <p className="text-danger mt-2">
          Year must be between 1800 and this year.
        </p>
      );
    }
    if (!this.validateRuntime()) {
      runtimeError = (
        <p className="text-danger mt-2">Runtime must be a positive number.</p>
      );
    }
    if (!this.validateGenres()) {
      genresError = (
        <p className="text-danger mt-2">Choose at least 1 genre.</p>
      );
    }
    if (!this.validatePlot()) {
      plotError = <p className="text-danger mt-2">Plot is required.</p>;
    }
    if (!this.validateDirector()) {
      directorError = (
        <p className="text-danger mt-2">Director must be a string.</p>
      );
    }
    if (!this.validateActors()) {
      actorsError = (
        <p className="text-danger mt-2">Actors must be a string.</p>
      );
    }

    return (
      <div id="form">
        <h2>Edit Movie</h2>
        <div className="form-container">
          {this.state.redirectToHome ? <Redirect to="/Home" /> : null}

          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                ref={(input) => {
                  this.inputToFocus = input;
                }}
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />{" "}
              {titleError}
            </Form.Group>

            <Row className="g-2">
              <Col md>
                <Form.Group controlId="year">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="text"
                    name="year"
                    value={this.state.year}
                    onChange={this.handleChange}
                  />{" "}
                  {yearError}
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group controlId="runtime">
                  <Form.Label>Runtime</Form.Label>
                  <Form.Control
                    type="text"
                    name="runtime"
                    value={this.state.runtime}
                    onChange={this.handleChange}
                  />{" "}
                  {runtimeError}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="genres">
              <Form.Label>Genres</Form.Label>
              <InputGroup>
                <Form.Control
                  name="selectedGenre"
                  as="select"
                  onChange={this.handleChange}
                  defaultValue={"DEFAULT"}
                >
                  <option value="DEFAULT" disabled>
                    Select genre...
                  </option>
                  {genres
                    .filter((g) => !this.state.genres.includes(g))
                    .map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                </Form.Control>

                <Button variant="outline-secondary" onClick={this.addGenre}>
                  Add Genre
                </Button>
              </InputGroup>
              {this.state.genres.map((g) => (
                <span className="badge badge-secondary p-1 mt-2 mr-2" key={g}>
                  {g}
                  <XLg
                    data-id={g}
                    className="ml-1"
                    onClick={this.removeGenre}
                  />
                </span>
              ))}{" "}
              {genresError}
            </Form.Group>

            <Form.Group controlId="plot">
              <Form.Label>Plot</Form.Label>
              <Form.Control
                type="text"
                name="plot"
                as="textarea"
                value={this.state.plot}
                onChange={this.handleChange}
              />{" "}
              {plotError}
            </Form.Group>

            <Form.Group controlId="director">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                name="director"
                value={this.state.director}
                onChange={this.handleChange}
              />{" "}
              {directorError}
            </Form.Group>

            <Form.Group controlId="actors">
              <Form.Label>Actors</Form.Label>
              <Form.Control
                type="text"
                name="actors"
                value={this.state.actors}
                onChange={this.handleChange}
              />{" "}
              {actorsError}
            </Form.Group>

            <Form.Group>
              <Form.Label>Poster</Form.Label>
              <Row>
                <Col md>
                  <Form.Control
                    type="text"
                    name="posterUrl"
                    value={this.state.posterUrl}
                    onChange={this.handleChange}
                    placeholder="Enter poster link"
                  />
                </Col>{" "}
                or
                <Col md>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) =>
                      this.setState({ posterUrl: base64 })
                    }
                  />
                </Col>
              </Row>
            </Form.Group>

            <button
              className="btn btn-success mr-2"
              onClick={this.handleSubmit}
              disabled={!inputsAreAllValid}
            >
              Update
            </button>

            <Link className="btn btn-danger ml-2" to={"/Home"}>
              Cancel
            </Link>
          </Form>
        </div>
      </div>
    );
  }
}

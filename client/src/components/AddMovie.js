import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import Swal from "sweetalert2";
import FileBase64 from "react-file-base64";

export default class AddMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      year: "",
      runtime: "",
      selectedGenre: "",
      genres: [],
      director: "",
      actors: "",
      plot: "",
      posterUrl: "",
      dataset: "",
      redirectToHome: false,
    };
  }
  componentDidMount() {
    this.inputToFocus.focus();
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
      image: this.state.image,
    };

    axios.post(`${SERVER_HOST}/movies`, movieObject).then((res) => {
      if (res.data) {
        if (res.data.errorMessage) {
          console.log(res.data.errorMessage);
        } else {
          console.log("Record added");
          Swal.fire({
            title: "Record Added",
            text: "The movie has been added.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.setState({ redirectToHome: true });
        }
      } else {
        console.log("Record not added");
        Swal.fire({
          title: "Records Not Added",
          text: "Make sure that data is valid and is not a duplicate.",
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#123c69",
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

    return (
      <div id="form">
        <div className="text-center mb-5">
          <Link
            className="badge badge-light badge-pill mr-5 p-2"
            to={"/AddMovie"}
          >
            Add one movie
          </Link>
          or
          <Link
            className="badge badge-light badge-pill ml-5 p-2"
            to={"/AddMovieDataset"}
          >
            Add movie dataset
          </Link>
        </div>
        {this.state.redirectToHome ? <Redirect to="/Home" /> : null}
        <h2>Add One Movie</h2>
        <div className="form-container">
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
              />
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
                  />
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
                  />
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
              ))}
            </Form.Group>

            <Form.Group controlId="plot">
              <Form.Label>Plot</Form.Label>
              <Form.Control
                type="text"
                name="plot"
                as="textarea"
                value={this.state.plot}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="director">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                name="director"
                value={this.state.director}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="actors">
              <Form.Label>Actors</Form.Label>
              <Form.Control
                type="text"
                name="actors"
                value={this.state.actors}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="posterUrl">
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
                </Col>
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
            >
              Add
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

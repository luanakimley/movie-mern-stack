import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";
import Form from "react-bootstrap/Form";
import LinkInClass from "./LinkInClass";

export default class AddCar extends Component {
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
    };
  }

  componentDidMount() {
    this.inputToFocus.focus();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
    };

    axios.post(`${SERVER_HOST}/movies`, movieObject).then((res) => {
      if (res.data) {
        if (res.data.errorMessage) {
          console.log(res.data.errorMessage);
        } else {
          console.log("Record added");
          this.setState({ redirectToHome: true });
        }
      } else {
        console.log("Record not added");
      }
    });
  };

  render() {
    return (
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
            />
          </Form.Group>

          <Form.Group controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="text"
              name="year"
              value={this.state.year}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="runtime">
            <Form.Label>Runtime</Form.Label>
            <Form.Control
              type="text"
              name="runtime"
              value={this.state.runtime}
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

          <LinkInClass
            value="Add"
            className="btn btn-success"
            onClick={this.handleSubmit}
          />

          <Link className="btn btn-danger" to={"/Home"}>
            Cancel
          </Link>
        </Form>
      </div>
    );
  }
}

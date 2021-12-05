import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";
import { SERVER_HOST } from "../config/global_constants";
import Swal from "sweetalert2";

export default class AddMovieDataset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false,
      datasetUrl: "",
      dataset: "",
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.inputToFocus.focus();
  }

  handleSubmitDataset = (e) => {
    e.preventDefault();

    const movieArray = this.state.dataset;

    axios.post(`${SERVER_HOST}/movies`, movieArray).then((res) => {
      if (res.data) {
        if (res.data.errorMessage) {
          console.log(res.data.errorMessage);
        } else {
          console.log("Records added");
          Swal.fire({
            title: "Records Added",
            text: "Movie dataset has been added.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          this.setState({ redirectToHome: true });
        }
      } else {
        console.log("Records not added");
        Swal.fire({
          title: "Records Not Added",
          text: "Make sure that data is valid and is not a duplicate.",
          icon: "error",
          confirmButtonColor: "#123c69",
          showConfirmButton: true,
        });
      }
    });
  };

  render() {
    let url = this.state.datasetUrl;
    axios.get(url).then((res) => {
      if (res.data) {
        this.setState({ dataset: res.data.movies });
      } else {
        console.log("Not found");
      }
    });

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
        <h2>Add Movie Dataset</h2>
        <div className="form-container">
          <Form>
            <Form.Group>
              <Form.Label>Dataset URL</Form.Label>
              <Form.Control
                ref={(input) => {
                  this.inputToFocus = input;
                }}
                type="text"
                name="datasetUrl"
                value={this.state.datasetUrl}
                onChange={this.handleChange}
              />
            </Form.Group>
            <button
              className="btn btn-success mr-2"
              onClick={this.handleSubmitDataset}
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

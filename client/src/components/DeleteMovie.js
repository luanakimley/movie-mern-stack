import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { SERVER_HOST } from "../config/global_constants";

export default class DeleteMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToHome: false,
    };
  }

  componentDidMount() {
    const MySwal = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mr-2",
        cancelButton: "btn btn-danger ml-2",
      },
      buttonsStyling: false,
    });

    MySwal.fire({
      title: "Are you sure you want to delete this?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5cb85c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${SERVER_HOST}/movies/${this.props.match.params.id}`)
          .then((res) => {
            if (res.data) {
              if (res.data.errorMessage) {
                console.log(res.data.errorMessage);
              } // success
              else {
                console.log("Record deleted");
              }
              this.setState({ redirectToHome: true });
            } else {
              console.log("Record not deleted");
            }
          });
        Swal.fire("Deleted!", "The movie has been deleted.", "success");
      } else {
        this.setState({ redirectToHome: true });
      }
    });
  }

  render() {
    return (
      <div>{this.state.redirectToHome ? <Redirect to="/Home" /> : null}</div>
    );
  }
}

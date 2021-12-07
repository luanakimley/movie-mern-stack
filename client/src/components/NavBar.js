import React, { Component, useState } from "react";
import { CameraReels } from "react-bootstrap-icons";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";
import Swal from "sweetalert2";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
    };
  }

  googleSuccess = (res) => {
    axios
      .post(
        `${SERVER_HOST}/api/googlelogin`,
        { tokenId: res.tokenId },
        { headers: { Authorization: localStorage.getItem("jwtToken") } }
      )
      .then((res) => {
        localStorage.setItem("jwtToken", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("isSignedIn", true);
        this.setState({ isSignedIn: true });
        console.log("Sign In Success", res);
        Swal.fire({
          title: "Sign In Successful",
          text: "You can now add, edit, and delete movie data.",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#123c69",
        });
      });
  };

  googleFailure = (res) => {
    console.log("Sign In Failed", res);
  };

  onSignOutSuccess = () => {
    console.log("You have been signed out successfully");
    localStorage.setItem("isSignedIn", false);
    this.setState({ isSignedIn: false });
    window.location.reload(false);
    localStorage.clear();
  };

  render() {
    return (
      <div>
        <header id="header" className="fixed-top">
          <div className="container d-flex align-items-center justify-content-between">
            <div className="d-flex flex-direction-row">
              <CameraReels color="#123c69" size={40} />
              <h1 className="ml-3">Movies Collection</h1>
            </div>

            {localStorage.getItem("isSignedIn") === "true" ? (
              <GoogleLogout
                className="align-self-center mb-2 "
                clientId="374142562845-rrr3sqtq0c25ocgonbe25lebn4258gut.apps.googleusercontent.com"
                onLogoutSuccess={this.onSignOutSuccess}
              />
            ) : (
              <GoogleLogin
                className="align-self-center mb-2"
                clientId="374142562845-rrr3sqtq0c25ocgonbe25lebn4258gut.apps.googleusercontent.com"
                onSuccess={this.googleSuccess}
                onFailure={this.googleFailure}
                cookiePolicy="single_host_origin"
                isSignedIn={true}
              />
            )}
          </div>
        </header>
      </div>
    );
  }
}

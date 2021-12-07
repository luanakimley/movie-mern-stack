import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Redirect } from "react-router-dom";

class MustLogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false,
    };
  }

  toggleRedirectToHome() {
    this.setState({ redirectToHome: true });
  }

  handleRedirect = (e) => {
    this.toggleRedirectToHome();
  };

  render() {
    return (
      <div>
        {this.state.redirectToHome ? (
          <Redirect to="/" />
        ) : (
          <SweetAlert error title="No access!" onConfirm={this.handleRedirect}>
            You must be signed in to access this content.
          </SweetAlert>
        )}
      </div>
    );
  }
}

export default MustLogIn;

import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, exact, path, ...rest }) => (
  <Route
    exact={exact}
    path={path}
    render={(props) =>
      localStorage.getItem("isSignedIn") === "true" ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/MustLogIn" />
      )
    }
  />
);

export default ProtectedRoute;

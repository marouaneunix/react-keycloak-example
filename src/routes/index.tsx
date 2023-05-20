import * as React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import { useKeycloak } from "@react-keycloak/web";

import { useEffect } from "react";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";

import { PrivateRoute } from "./utils";

export const AppRouter = () => {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (!keycloak?.authenticated) {
      console.log("ijjjj");
      keycloak.login();
    }
  }, []);

  return (
    <Router>
      <Redirect from="/" to="/home" />
      <PrivateRoute path="/home" component={HomePage} />
    </Router>
  );
};

import React, { Component } from "react";
import axios from "axios";
import './index.scss';
import Default from '../Default';

import Registration from "./auth/Registration";
import Signin from "./auth/Signin";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <Default>
      <div className="Login">
      <div className="App__Aside"></div>
          <div className="App__Form">
          <h1>Log in</h1>
          <button onClick={() => this.handleLogoutClick()}>Logout</button>
          <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
          <Signin handleSuccessfulAuth={this.handleSuccessfulAuth} />
        </div>
      </div>
      </Default>
    );
  }
}
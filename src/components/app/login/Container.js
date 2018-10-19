import React from "react";
import SplashBox from "../../SplashBox";
import LoginForm from "./LoginForm";
import ResetPasswordForm from "./ResetPasswordForm";
import { login } from "../../../backend";

export default class LoginContainer extends React.Component {
  state = {
    trouble: false,
    username: "",
    password: "",
    loading: false
  };

  handleToggleTrouble = () => {
    this.setState({
      ...this.state,
      trouble: !this.state.trouble
    });
  };

  handleLogin = () => {
    this.startLoading();
    login(this.state.username, this.state.password).then(res => {
      this.stopLoading();
      console.log("in container", res);
    });
  };

  handlePasswordReset = () => {
    console.log("FIXME: Password reset");
  };

  handleUsernameUpdate = el => {
    this.setState({
      ...this.state,
      username: el.target.value
    });
  };

  handlePasswordUpdate = el => {
    this.setState({
      ...this.state,
      password: el.target.value
    });
  };

  startLoading = () => {
    this.setState({
      ...this.state,
      loading: true
    });
  };

  stopLoading = () => {
    this.setState({
      ...this.state,
      loading: false
    });
  };

  render() {
    return (
      <SplashBox>
        {this.state.trouble ? (
          <ResetPasswordForm
            loading={this.state.loading}
            language={this.props.language}
            handlePasswordReset={this.handlePasswordReset}
            handleToggleTrouble={this.handleToggleTrouble}
          />
        ) : (
          <LoginForm
            loading={this.state.loading}
            username={this.state.username}
            language={this.props.language}
            handleLogin={this.handleLogin}
            handleUsernameUpdate={this.handleUsernameUpdate}
            handlePasswordUpdate={this.handlePasswordUpdate}
            handleToggleTrouble={this.handleToggleTrouble}
          />
        )}
      </SplashBox>
    );
  }
}

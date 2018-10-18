import React from "react";
import SplashBox from "../../SplashBox";
import LoginForm from "./LoginForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default class LoginContainer extends React.Component {
  state = {
    trouble: false
  };

  handleToggleTrouble = () => {
    this.setState({
      trouble: !this.state.trouble
    });
  };

  handleLogin = () => {
    console.log("FIXME: Login");
  };

  handlePasswordReset = () => {
    console.log("FIXME: Password reset");
  };

  render() {
    console.log(this.props);
    return (
      <SplashBox>
        {this.state.trouble ? (
          <LoginForm
            language={this.props.language}
            handleLogin={this.handleLogin}
            handleToggleTrouble={this.handleToggleTrouble}
          />
        ) : (
          <ResetPasswordForm
            language={this.props.language}
            handlePasswordReset={this.handlePasswordReset}
            handleToggleTrouble={this.handleToggleTrouble}
          />
        )}
      </SplashBox>
    );
  }
}

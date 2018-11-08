import React from "react";
import { connect } from "react-redux";
import SplashBox from "../../SplashBox";
import LoginForm from "./LoginForm";
import ResetPasswordForm from "./ResetPasswordForm";
import backend from "../../../backend";
import { injectIntl } from "react-intl";
import { setUserAccount } from "../../../store/actions/user";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";
import { navigate } from "gatsby";
import { saveToken } from "../../../utils";

class LoginContainer extends React.Component {
  state = {
    dialog: false,
    trouble: false,
    username: "",
    password: "",
    loading: false,
    userData: {},
    resetPasswordCheckInbox: false
  };

  handleToggleTrouble = () => {
    this.setState({
      ...this.state,
      trouble: !this.state.trouble,
      resetPasswordCheckInbox: false
    });
  };

  handleLogin = evt => {
    evt.preventDefault();
    this.startLoading();
    backend
      .login(this.state.username, this.state.password)
      .then(res => {
        if (res.status === 200) {
          this.props.showNotification(
            "success",
            this.props.intl.formatMessage(
              { id: "app.goodToSeeYouAgain" },
              { user: "@" + res.data.account.username }
            )
          );
          this.props.setUserAccount(res.data.account);
          saveToken(res.data.token);
          this.stopLoading();
          navigate("/" + this.props.language);
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
        this.stopLoading();
      });
  };

  handlePasswordReset = evt => {
    evt.preventDefault();
    this.startLoading();
    backend
      .resetPassword(evt.target.elements["username"].value)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            ...this.state,
            resetPasswordCheckInbox: true
          });
          this.stopLoading();
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
        this.stopLoading();
      });
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
            intl={this.props.intl}
            loading={this.state.loading}
            language={this.props.language}
            handlePasswordReset={this.handlePasswordReset}
            handleToggleTrouble={this.handleToggleTrouble}
            checkInbox={this.state.resetPasswordCheckInbox}
          />
        ) : (
          <LoginForm
            intl={this.props.intl}
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

const mapStateToProps = state => ({
  user: state.user,
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  setUserAccount: account => dispatch(setUserAccount(account)),
  showNotification: (style, message) =>
    dispatch(showNotification(style, message)),
  closeNotification: () => dispatch(closeNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(LoginContainer));

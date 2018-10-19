import React from "react";
import SplashBox from "../../SplashBox";
import Notification from "../../Notification";
import LoginForm from "./LoginForm";
import ResetPasswordForm from "./ResetPasswordForm";
import backend from "../../../backend";
import { injectIntl } from "react-intl";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class LoginContainer extends React.Component {
  state = {
    dialog: false,
    trouble: false,
    username: "",
    password: "",
    loading: false,
    userData: {},
    notification: {
      show: false,
      message: "",
      type: "info"
    }
  };

  notify = (type, message) => {
    this.setState({
      //...this.state,
      notification: {
        show: true,
        type: type,
        message: message
      }
    });
  };

  handleNotificationOnClose = () => {
    // Triggered on auto-close
    if (this.state.notification.show === true) {
      this.handleNotificationClose();
    }
  };

  handleNotificationClose = () => {
    this.setState({
      ...this.state,
      notification: {
        ...this.state.notification,
        show: false
      }
    });
  };

  handleDialogClose = () => {
    this.setState({
      ...this.state,
      dialog: false
    });
  };

  handleToggleTrouble = () => {
    this.setState({
      ...this.state,
      trouble: !this.state.trouble
    });
  };

  handleLogin = () => {
    this.startLoading();
    backend
      .login(this.state.username, this.state.password)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            ...this.state,
            userData: res.data,
            dialog: true
          });
          this.stopLoading();
        }
      })
      .catch(err => {
        console.log(err);
        this.notify("error", err);
        this.stopLoading();
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
            intl={this.props.intl}
            loading={this.state.loading}
            language={this.props.language}
            handlePasswordReset={this.handlePasswordReset}
            handleToggleTrouble={this.handleToggleTrouble}
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
        <Notification
          type={this.state.notification.type}
          message={this.state.notification.message}
          onClose={this.handleNotificationOnClose}
          open={this.state.notification.show}
          handleClose={this.handleNotificationClose}
        />
        <Dialog
          open={this.state.dialog}
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Thanks for trying this 😀"}
          </DialogTitle>
          <DialogContent>
            <b>Does this data look OK to you?</b>
            <pre>{JSON.stringify(this.state.userData, null, 2)}</pre>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </SplashBox>
    );
  }
}

export default injectIntl(LoginContainer);

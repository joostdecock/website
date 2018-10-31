import React from "react";
import { connect } from "react-redux";
import SplashBox from "../../SplashBox";
import SignupForm from "./SignupForm";
import SuccessMessage from "./SuccessMessage";
import backend from "../../../backend";
import { injectIntl } from "react-intl";
import { setUserAccount } from "../../../store/actions/user";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";
import { validateEmail, validateTld } from "../../../utils";
//import { navigate } from "gatsby";

class SignupContainer extends React.Component {
  state = {
    dialog: false,
    trouble: false,
    email: "",
    password: "",
    loading: false,
    success: false,
    userData: {}
  };

  handleResend = () => {
    this.props.showNotification(
      "info",
      this.props.intl.formatMessage({ id: "app.resendActivationEmailMessage" })
    );
  };

  handleSignup = evt => {
    evt.preventDefault();
    this.startLoading();
    if (!validateEmail(this.state.email)) {
      this.props.showNotification(
        "error",
        this.props.intl.formatMessage({
          id: "app.pleaseEnterAValidEmailAddress"
        })
      );
      this.stopLoading();
      return;
    }
    let tld = validateTld(this.state.email);
    if (tld !== true) {
      this.props.showNotification(
        "error",
        this.props.intl.formatMessage(
          { id: "app.invalidTldMessage" },
          { tld: tld }
        ) +
          " — " +
          this.props.intl.formatMessage({
            id: "app.pleaseEnterAValidEmailAddress"
          })
      );
      this.stopLoading();
      return;
    }
    backend
      .signup(this.state.email, this.state.password, this.props.language)
      .then(res => {
        if (res.status === 200) {
          this.stopLoading();
          this.setState({
            ...this.state,
            success: true
          });
        }
      })
      .catch(err => {
        this.stopLoading();
        if (err.response.data === "userExists") {
          this.props.showNotification("warning", new Error("emailExists"));
        } else {
          this.props.showNotification("error", err);
        }
      });
  };

  handlePasswordReset = () => {
    console.log("FIXME: Password reset");
  };

  handleEmailUpdate = el => {
    this.setState({
      ...this.state,
      email: el.target.value
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
        {this.state.success ? (
          <SuccessMessage language={this.props.language} />
        ) : (
          <SignupForm
            intl={this.props.intl}
            loading={this.state.loading}
            email={this.state.email}
            language={this.props.language}
            handleSignup={this.handleSignup}
            handleEmailUpdate={this.handleEmailUpdate}
            handlePasswordUpdate={this.handlePasswordUpdate}
            handleResend={this.handleResend}
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
)(injectIntl(SignupContainer));

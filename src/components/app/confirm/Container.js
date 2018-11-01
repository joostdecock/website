import React from "react";
import { connect } from "react-redux";
import LoadingMessage from "./LoadingMessage";
import FailureMessage from "./FailureMessage";
import backend from "../../../backend";
import ProfileConsent from "../../ProfileConsent";
import { injectIntl } from "react-intl";
import { setUserAccount } from "../../../store/actions/user";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";
import { navigate } from "gatsby";
import { saveToken } from "../../../utils";

class ConfirmContainer extends React.Component {
  state = {
    loading: true,
    consentLoading: false,
    error: false,
    showConsent: false,
    consent: "no"
  };

  startLoading = () => {};

  stopLoading = () => {
    this.setState({
      ...this.state,
      loading: false
    });
  };

  getConfirmId = () => this.props.location.pathname.split("/").pop();

  handleConsentSubmit = evt => {
    evt.preventDefault();
    this.setState({
      ...this.state,
      consentLoading: true
    });
    backend
      .createAccount(this.getConfirmId())
      .then(res => {
        if (res.status === 200) {
          this.props.showNotification(
            "success",
            this.props.intl.formatMessage({ id: "app.accountCreated" }) +
              " 🙌  " +
              this.props.intl.formatMessage({ id: "app.welcomeAboard" }) +
              " 🎉"
          );
          this.props.setUserAccount(res.data.account);
          saveToken(res.data.token);
          this.stopLoading();
          navigate("/" + this.props.language + "/welcome");
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
        this.stopLoading();
      });
  };

  handleConsentChange = evt => {
    this.setState({
      ...this.state,
      consent: evt.target.value
    });
  };

  componentDidMount() {
    let confirmId = this.getConfirmId();
    backend
      .confirm(confirmId)
      .then(res => {
        if (res.status === 200) {
          if (res.data.type === "signup")
            this.setState({
              ...this.state,
              loading: false,
              error: false,
              showConsent: true
            });
        }
      })
      .catch(err => {
        this.setState({
          ...this.state,
          loading: false,
          error: true
        });
      });
  }

  render() {
    let content = "";
    if (this.state.error)
      content = (
        <FailureMessage
          language={this.props.language}
          id={this.getConfirmId()}
        />
      );
    else if (this.state.showConsent)
      content = (
        <ProfileConsent
          language={this.props.language}
          intro={true}
          outro={true}
          handleConsentSubmit={this.handleConsentSubmit}
          handleConsentChange={this.handleConsentChange}
          intl={this.props.intl}
          consent={this.state.consent || "no"}
          loading={this.state.consentLoading}
        />
      );
    else content = <LoadingMessage language={this.props.language} />;
    return content;
  }
}

const mapStateToProps = state => ({
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
)(injectIntl(ConfirmContainer));

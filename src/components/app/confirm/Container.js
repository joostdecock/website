import React from "react";
import { connect } from "react-redux";
import LoadingMessage from "./LoadingMessage";
import FailureMessage from "./FailureMessage";
import backend from "../../../backend";
import ProfileConsent from "../../ProfileConsent";
import { injectIntl } from "react-intl";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";

class ConfirmContainer extends React.Component {
  state = {
    loading: true,
    error: false,
    showConsent: false,
    consent: "no"
  };

  stopLoading = () => {
    this.setState({
      ...this.state,
      loading: false
    });
  };

  getConfirmId = () => this.props.location.pathname.split("/").pop();

  handleConsentSubmit = evt => {
    evt.preventDefault();
    this.startLoading();
    //backend
    //  .login(this.state.username, this.state.password)
    //  .then(res => {
    //    if (res.status === 200) {
    //      this.props.showNotification(
    //        "success",
    //        this.props.intl.formatMessage(
    //          { id: "app.goodToSeeYouAgain" },
    //          { user: "@" + res.data.account.username }
    //        )
    //      );
    //      this.props.setUserAccount(res.data.account);
    //      saveToken(res.data.token);
    //      this.stopLoading();
    //      navigate("/" + this.props.language);
    //    }
    //  })
    //  .catch(err => {
    //    console.log(err);
    //    this.props.showNotification("error", err);
    //    this.stopLoading();
    //  });
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
  showNotification: (style, message) =>
    dispatch(showNotification(style, message)),
  closeNotification: () => dispatch(closeNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ConfirmContainer));

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
import FieldForm from "../account/FieldForm";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";

class ConfirmContainer extends React.Component {
  state = {
    loading: true,
    consentLoading: false,
    error: false,
    showConsent: false,
    showResetPasswordForm: false,
    consent: "no",
    newPassword: "",
    handle: false,
    confirmation: false
  };

  startLoading = () => {};

  stopLoading = () => {
    this.setState({
      ...this.state,
      loading: false
    });
  };

  getConfirmId = () => this.props.location.split("/").pop();

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

  handlePasswordSubmit = evt => {
    evt.preventDefault();
    backend
      .setPassword({
        handle: this.state.handle,
        confirmation: this.state.confirmation,
        password: evt.target.elements["password"].value
      })
      .then(res => {
        if (res.status === 200) {
          this.props.setUserAccount(res.data.account);
          saveToken(res.data.token);
          this.stopLoading();
          this.props.showNotification(
            "success",
            this.props.intl.formatMessage(
              { id: "app.fieldSaved" },
              {
                field: this.props.intl.formatMessage({
                  id: "account.newPassword"
                })
              }
            )
          );
          navigate("/" + this.props.language + "/account");
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
        this.stopLoading();
      });
  };

  handlePasswordChange = evt => {};

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
          else if (res.data.type === "emailchange") {
            backend
              .saveAccount({
                email: res.data.data.email.new,
                confirmation: res.data._id
              })
              .then(res => {
                if (res.status === 200) {
                  let msg = this.props.intl.formatMessage(
                    { id: "app.fieldSaved" },
                    {
                      field: this.props.intl.formatMessage({
                        id: "account.email"
                      })
                    }
                  );
                  this.props.showNotification("success", msg);
                  this.props.setUserAccount(res.data.account);
                  navigate("/" + this.props.language + "/account");
                }
              })
              .catch(err => {
                console.log(err);
                this.props.showNotification("error", err);
              });
          } else if (res.data.type === "passwordreset") {
            this.setState({
              ...this.state,
              loading: false,
              error: false,
              showResetPasswordForm: true,
              handle: res.data.data.handle,
              confirmation: confirmId
            });
          }
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
    else if (this.state.showResetPasswordForm)
      content = (
        <div className="content">
          <h2>
            <FormattedMessage id="account.resetPasswordTitle" />
          </h2>
          <form onSubmit={this.handlePasswordSubmit} data-field="password">
            <FieldForm
              intl={this.props.intl}
              field="resetpassword"
              value={this.state.newPassword}
              handleValueUpdate={this.handlePasswordChange}
              location={this.props.location}
            />
            <Button type="submit" variant="contained" color="primary">
              <SaveIcon className="mr10" />
              <FormattedMessage id="app.save" />
            </Button>
          </form>
          <div className="box">
            <h5>
              <FormattedMessage id="account.resetPassword" />
            </h5>
            <p>
              <FormattedHTMLMessage id="account.resetPasswordInfo" />
            </p>
          </div>
        </div>
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

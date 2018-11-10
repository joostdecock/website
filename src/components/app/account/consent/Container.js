import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from "react-intl";
import Button from "@material-ui/core/Button";
import backend from "../../../../backend";
import { locLang, clearToken, capitalize } from "../../../../utils";
import { setUserAccount } from "../../../../store/actions/user";
import { Link } from "gatsby";
import ButtonSpinner from "../../../ButtonSpinner";
import { navigate } from "gatsby";
import { showNotification } from "../../../../store/actions/notification";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import SaveIcon from "@material-ui/icons/Save";
import BackIcon from "@material-ui/icons/KeyboardArrowLeft";
import WarningIcon from "@material-ui/icons/Warning";
import ProfileDataIcon from "@material-ui/icons/AccountCircle";
import WhyIcon from "@material-ui/icons/Help";
import TimingIcon from "@material-ui/icons/AccessTime";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ConsentIcon from "@material-ui/icons/DoneAll";
import RemoveIcon from "@material-ui/icons/DeleteForever";

class AccountConsentContainer extends React.Component {
  state = {
    loading: false,
    consent: false,
    modelConsent: false,
    profileConsent: false,
    opendataConsent: false
  };

  componentDidMount() {
    this.userToState();
  }

  userToState() {
    let user = this.props.user;
    this.setState({
      ...this.state,
      modelConsent: user.consent.model,
      profileConsent: user.consent.profile,
      opendataConsent: user.consent.openData
    });
  }

  toggleConsent = type => {
    let newState = {};
    newState[type + "Consent"] = !this.state[type + "Consent"];
    this.setState({
      ...this.state,
      ...newState
    });
  };

  showConsent = key => {
    this.setState({
      ...this.state,
      consent: key
    });
  };

  removeAccount = () => {
    backend
      .remove()
      .then(res => {
        if (res.status === 200) {
          clearToken();
          this.props.setUserAccount(false);
          this.props.showNotification(
            "warning",
            <FormattedMessage id="account.accountRemoved" />
          );
          navigate(locLang.set("/", locLang.get(this.props.location)));
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  handleSave = () => {
    this.setState({
      ...this.state,
      loading: true
    });
    let consent = {
      profile: this.state.profileConsent,
      model: this.state.modelConsent,
      openData: this.state.opendataConsent
    };
    if (!consent.profile) this.removeAccount();
    else {
      backend
        .saveAccount({ consent })
        .then(res => {
          if (res.status === 200) {
            let msg = this.props.intl.formatMessage(
              { id: "app.fieldSaved" },
              { field: this.props.intl.formatMessage({ id: "gdpr.consent" }) }
            );
            this.props.showNotification("success", msg);
            this.props.setUserAccount(res.data.account);
            this.userToState();
            this.setState({
              ...this.state,
              loading: false,
              consent: false
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({ loading: false });
        });
    }
  };

  switchClasses = {
    colorSwitchBase: {
      color: "orange",
      "&$colorChecked": {
        color: "orange",
        "& + $colorBar": {
          backgroundColor: "orange"
        }
      }
    }
  };

  consentTypes = ["profile", "model"];

  profileWarning = <div className="box">you sure about this dude?</div>;
  render() {
    let type = this.state.consent;
    let value = this.state[type + "Consent"];
    let opendataListItem = "";
    let profileDanger = false;
    let modelDanger = false;
    if (
      this.props.user.consent.profile &&
      !this.state.profileConsent &&
      type === "profile"
    )
      profileDanger = true;
    if (
      this.props.user.consent.model &&
      !this.state.modelConsent &&
      type === "model"
    )
      modelDanger = true;
    if (type !== false) {
      const Type = capitalize(type);
      if (type === "model")
        opendataListItem = (
          <ListItem button onClick={() => this.toggleConsent("opendata")}>
            <ListItemIcon>
              <ConsentIcon
                classes={{
                  root: this.state.opendataConsent
                    ? "txt-success"
                    : "txt-danger"
                }}
              />
            </ListItemIcon>
            <ListItemText>
              <div className="keyval">
                <span className="key" key="opendata">
                  <FormattedMessage id="gdpr.openDataQuestion" />
                </span>
                <span className="val" key={"val-" + type}>
                  {this.state.opendataConsent ? (
                    <FormattedMessage id="gdpr.consentGiven" key="yes" />
                  ) : (
                    <FormattedMessage id="gdpr.consentNotGiven" key="no" />
                  )}
                </span>
                <span className="note" key="extra">
                  <FormattedMessage id="gdpr.openDataInfo" />
                </span>
              </div>
            </ListItemText>
            <ListItemSecondaryAction>
              <Switch
                className={
                  this.state.opendataConsent
                    ? "switch-success"
                    : "switch-danger"
                }
                color="primary"
                checked={this.state.opendataConsent}
                onClick={() => this.toggleConsent("opendata")}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      return (
        <div className="content">
          <h1>
            <FormattedMessage id={`gdpr.consentFor${Type}Data`} />
          </h1>
          <div className="overpad1">
            <List component="nav">
              <ListItem button onClick={() => this.toggleConsent(type)}>
                <ListItemIcon>
                  <ConsentIcon
                    classes={{ root: value ? "txt-success" : "txt-danger" }}
                  />
                </ListItemIcon>
                <ListItemText>
                  <div className="keyval">
                    <span className="key" key={"key-" + type}>
                      <FormattedMessage id={`gdpr.consentFor${Type}Data`} />
                    </span>
                    <span className="val" key={"val-" + type}>
                      {value ? (
                        <FormattedMessage id="gdpr.consentGiven" />
                      ) : (
                        <FormattedMessage id="gdpr.consentNotGiven" />
                      )}
                    </span>
                  </div>
                </ListItemText>
                <ListItemSecondaryAction>
                  <Switch
                    className={value ? "switch-success" : "switch-danger"}
                    color="primary"
                    onClick={() => this.toggleConsent(type)}
                    checked={value}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              {value ? opendataListItem : ""}
            </List>
            {profileDanger || modelDanger ? (
              <div className="box low">
                <h5>
                  <WarningIcon classes={{ root: "txt-danger mr10 mb-4" }} />
                  <FormattedMessage id="app.proceedWithCaution" />
                </h5>
                <p>
                  {profileDanger ? (
                    <FormattedMessage id="gdpr.profileWarning" />
                  ) : (
                    <FormattedMessage id="gdpr.modelWarning" />
                  )}
                </p>
              </div>
            ) : (
              ""
            )}
            <div className="txt-right">
              <Button
                onClick={() => this.showConsent(false)}
                className="mr10 mt10"
                variant="outlined"
              >
                <BackIcon />
                <FormattedMessage id="app.back" />
              </Button>
              <Button
                className={
                  profileDanger ? "mr19 mt10 button-danger" : "mr10 mt10"
                }
                variant="contained"
                color="primary"
                size="large"
                onClick={this.handleSave}
              >
                <ButtonSpinner
                  loading={this.state.loading}
                  icon={
                    profileDanger ? (
                      <RemoveIcon className="btn-icon" />
                    ) : (
                      <SaveIcon className="btn-icon" />
                    )
                  }
                />
                {profileDanger ? (
                  <FormattedMessage id="account.removeYourAccount" />
                ) : (
                  <FormattedMessage id="app.save" />
                )}
              </Button>
            </div>
          </div>
          <div className="box">
            <h4>
              <FormattedMessage id="gdpr.whatYouNeedToKnow" />
            </h4>
            <h6>
              <ProfileDataIcon className="mr10 not-on-xs" fontSize="inherit" />
              <FormattedMessage id={`gdpr.${type}WhatQuestion`} />
            </h6>
            <ul>
              <li>
                <FormattedHTMLMessage id={`gdpr.${type}WhatAnswer`} />
              </li>
              <li>
                <FormattedHTMLMessage id={`gdpr.${type}WhatAnswerOptional`} />
              </li>
            </ul>
            <h6>
              <WhyIcon className="mr10 not-on-xs" fontSize="inherit" />
              <FormattedMessage id="gdpr.whyQuestion" />
            </h6>
            <ul>
              <li>
                <FormattedHTMLMessage id={`gdpr.${type}WhyAnswer`} />
              </li>
            </ul>
            <h6>
              <TimingIcon className="mr10 not-on-xs" fontSize="inherit" />
              <FormattedMessage id="gdpr.timingQuestion" />
            </h6>
            <ul>
              <li>
                <FormattedHTMLMessage id="gdpr.profileTimingAnswer" />
              </li>
            </ul>
            <h6>
              <ShareIcon className="mr10 not-on-xs" fontSize="inherit" />
              <FormattedMessage id="gdpr.shareQuestion" />
            </h6>
            <ul>
              <li>
                <FormattedHTMLMessage id="gdpr.profileShareAnswer" />
              </li>
            </ul>
          </div>
        </div>
      );
    } else
      return (
        <div className="content">
          <h1>
            <FormattedMessage id="account.reviewYourConsent" />
          </h1>
          <div className="overpad1">
            <List component="nav">
              {this.consentTypes.map((type, index) => {
                const Type = capitalize(type);
                return (
                  <ListItem button onClick={() => this.showConsent(type)}>
                    <ListItemIcon>
                      <ConsentIcon
                        className={
                          this.props.user.consent[type]
                            ? "color-success"
                            : "color-danger"
                        }
                      />
                    </ListItemIcon>
                    <ListItemText>
                      <div className="keyval">
                        <span className="key" key={"key-" + type}>
                          <FormattedMessage id={`gdpr.consentFor${Type}Data`} />
                        </span>
                        <span className="val" key={"val-" + type}>
                          {this.props.user.consent[type] ? (
                            <FormattedMessage id="gdpr.consentGiven" />
                          ) : (
                            <FormattedMessage id="gdpr.consentNotGiven" />
                          )}
                        </span>
                      </div>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="Comments"
                        onClick={() => this.showConsent(type)}
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </div>
          <div className="box">
            <h5>
              <FormattedMessage id="account.reviewYourConsent" />
            </h5>
            <p>
              <FormattedHTMLMessage id="gdpr.compliant" />
            </p>
            <p>
              <FormattedHTMLMessage id="gdpr.consentWhyAnswer" />
            </p>
            <blockquote>
              <Link
                to={locLang.set(
                  "/docs/privacy",
                  locLang.get(this.props.location)
                )}
              >
                <FormattedMessage id="gdpr.readMore" />
              </Link>
            </blockquote>
          </div>
        </div>
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
    dispatch(showNotification(style, message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AccountConsentContainer));

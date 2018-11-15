import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import backend from "../../../backend";
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { setUserAccount } from "../../../store/actions/user";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";
import { navigate } from "gatsby";
import { locLang } from "../../../utils";
import MobileStepper from "@material-ui/core/MobileStepper";
import Units from "./Units";
import AvatarUpload from "./AvatarUpload";
import AvatarPreview from "./AvatarPreview";
import Bio from "./Bio";
import Social from "./Social";
import remark from "remark";
import html from "remark-html";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import FieldForm from "../account/FieldForm";
import Tray from "../../Tray";
import TrayTitle from "../../TrayTitle";
import TrayFooter from "../../TrayFooter";
import Breadcrumbs from "../../Breadcrumbs";
import WhyIcon from "@material-ui/icons/Help";

class WelcomeContainer extends React.Component {
  state = {
    loading: true,
    error: false,
    activeStep: 0,
    units: false,
    username: false,
    avatarPreview: false,
    avatar: false,
    bio: false,
    bioPreview: false,
    github: false,
    twitter: false,
    instagram: false,
    maxSteps: 5
  };

  saveAccount = (data, field) => {
    backend
      .saveAccount(data)
      .then(res => {
        if (res.status === 200) {
          this.props.showNotification(
            "success",
            this.props.intl.formatMessage(
              { id: "app.fieldSaved" },
              { field: this.props.intl.formatMessage({ id: "app." + field }) }
            )
          );
          this.props.setUserAccount(res.data.account);
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
      });
  };

  saveUnits = () =>
    this.saveAccount({ settings: { units: this.getUnits() } }, "units");

  saveUsername = () =>
    this.saveAccount({ username: this.getUsername() }, "username");

  saveAvatar = () => {
    if (typeof this.getAvatar() === "object") {
      var data = new FormData();
      data.append("picture", this.getAvatar());
      return this.saveAccount(data, "avatar");
    } else {
      this.props.showNotification(
        "info",
        this.props.intl.formatMessage({ id: "app.noChanges" })
      );
    }
  };

  saveBio = () => this.saveAccount({ bio: this.getBio() }, "bio");

  saveSocial = () => {
    this.saveAccount(
      {
        social: {
          github: this.getGithub(),
          twitter: this.getTwitter(),
          instagram: this.getInstagram()
        }
      },
      "social"
    );
    navigate(locLang.get("/docs/getting-started", this.props.language));
  };

  getUnits = () => this.state.units || this.props.user.settings.units;
  getUsername = () => this.state.username || this.props.user.username;
  getAvatar = () => this.state.avatar || this.props.user.picture;
  getBio = () => this.state.bio || this.props.user.bio;
  getBioPreview = () => {
    if (this.state.bioPreview !== false) return this.state.bioPreview;
    let result = "";
    remark()
      .use(html)
      .process(this.props.user.bio, (err, md) => (result = md));
    return result;
  };
  getGithub = () =>
    this.state.github ||
    (this.props.user.social ? this.props.user.social.github : "");
  getTwitter = () =>
    this.state.twitter ||
    (this.props.user.social ? this.props.user.social.twitter : "");
  getInstagram = () =>
    this.state.instagram ||
    (this.props.user.social ? this.props.user.social.instagram : "");

  handleNext = () => {
    let saved = this.state.activeStep;
    this.setState(state => ({
      ...this.state,
      activeStep: saved + 1
    }));
    if (saved === 0) this.saveUnits();
    if (saved === 1) this.saveUsername();
    if (saved === 2) this.saveAvatar();
    if (saved === 3) this.saveBio();
    if (saved === 4) this.saveSocial();
  };

  handleBack = () => {
    this.setState(state => ({
      ...this.state,
      activeStep: state.activeStep - 1
    }));
  };

  handleUnitsChange = evt => {
    let value = evt.target.value; // Needed because setState is async
    this.setState(state => ({
      ...state,
      units: value
    }));
  };

  handleUsernameChange = evt => {
    let value = evt.target.value; // Needed because setState is async
    this.setState(state => ({
      ...state,
      username: value
    }));
  };

  handleAvatarDrop = (accepted, rejected) => {
    if (typeof accepted[0] !== "undefined") {
      this.setState(state => ({
        ...state,
        avatar: accepted[0],
        avatarPreview: true
      }));
    } else if (typeof rejected[0] !== "undefined") {
      this.props.showNotification("warning", new Error("notAValidImageFormat"));
    }
  };

  handleAvatarReset = () => {
    this.setState(state => ({
      ...state,
      avatar: false,
      avatarPreview: false
    }));
  };

  handleBioChange = evt => {
    let value = evt.target.value; // Needed because setState is async
    this.setState(state => ({
      ...state,
      bio: value
    }));
    remark()
      .use(html)
      .process(value, (err, md) => {
        this.setState(state => ({
          ...state,
          bioPreview: md.contents
        }));
      });
  };

  handleGithubChange = evt => {
    let value = evt.target.value; // Needed because setState is async
    this.setState(state => ({
      ...state,
      github: value
    }));
  };

  handleTwitterChange = evt => {
    let value = evt.target.value; // Needed because setState is async
    this.setState(state => ({
      ...state,
      twitter: value
    }));
  };

  handleInstagramChange = evt => {
    let value = evt.target.value; // Needed because setState is async
    this.setState(state => ({
      ...state,
      instagram: value
    }));
  };

  getStepContent(index) {
    let units = {
      key: "units",
      content: (
        <Units
          intl={this.props.intl}
          units={this.getUnits()}
          handleUnitsChange={this.handleUnitsChange}
        />
      )
    };
    let username = {
      key: "username",
      content: (
        <FieldForm
          intl={this.props.intl}
          field="username"
          value={this.state.username || ""}
          handleValueUpdate={this.handleUsernameChange}
        />
      )
    };
    let aUpload = {
      key: "avatar",
      content: (
        <AvatarUpload
          intl={this.props.intl}
          handleAvatarDrop={this.handleAvatarDrop}
          avatarPreview={this.state.avatarPreview}
        />
      )
    };
    let aPreview = {
      key: "avatar",
      content: (
        <AvatarPreview
          intl={this.props.intl}
          avatar={this.state.avatar}
          avatarPreview={this.state.avatarPreview}
          handleAvatarReset={this.handleAvatarReset}
        />
      )
    };
    let bio = {
      key: "bio",
      content: (
        <Bio
          intl={this.props.intl}
          bio={this.getBio()}
          preview={this.getBioPreview()}
          handleBioChange={this.handleBioChange}
          data={this.props.data}
        />
      )
    };
    let social = {
      key: "social",
      content: (
        <Social
          intl={this.props.intl}
          github={this.getGithub()}
          twitter={this.getTwitter()}
          instagram={this.getInstagram()}
          handleGithubChange={this.handleGithubChange}
          handleTwitterChange={this.handleTwitterChange}
          handleInstagramChange={this.handleInstagramChange}
        />
      )
    };

    let steps = [
      units,
      username,
      this.state.avatarPreview ? aPreview : aUpload,
      bio,
      social
    ];

    return steps[index];
  }

  render() {
    const { activeStep, maxSteps } = this.state;
    let step = this.getStepContent(activeStep);
    return (
      <div>
        <Breadcrumbs>
          <FormattedMessage id="app.welcome" />
        </Breadcrumbs>
        <h1>
          <FormattedMessage id="app.completeSignupTitle" />
        </h1>
        <p className="maxw700">
          <FormattedMessage id="app.completeSignupText" />
        </p>
        <form className="maxw700">
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            classes={{ root: "nobg" }}
            nextButton={
              <Button size="small" onClick={this.handleNext}>
                <FormattedMessage id="app.save" />
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={this.handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
                <FormattedMessage id="app.back" />
              </Button>
            }
          />
          {step.content}
          <Tray className="my1">
            <TrayTitle icon={<WhyIcon />}>
              <FormattedMessage id={"app.whatIsThis"} />
            </TrayTitle>
            <p>
              <FormattedHTMLMessage id={"account." + step.key + "Info"} />
            </p>
            <TrayFooter />
          </Tray>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notification: state.notification,
  user: state.user
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
)(injectIntl(WelcomeContainer));

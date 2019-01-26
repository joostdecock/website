import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import backend from "../../../apis/backend";
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
import Social from "./Social";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import FieldForm from "../account/FieldForm";
import Tray from "../../Tray";
import Breadcrumbs from "../../Breadcrumbs";
import WhyIcon from "@material-ui/icons/Help";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import Center from "../../Center";
import TrayTitle from "../../TrayTitle";
import Spinner from "../../Spinner";
import Markdown from "react-markdown";

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
    maxSteps: 5,
    markdownPreview: ""
  };

  componentDidMount() {
    this.usernameToState();
  }

  usernameToState() {
    this.setState({
      username: this.props.user.username
    });
  }

  saveAccount = (data, field) => {
    backend
      .saveAccount(data)
      .then(res => {
        if (res.status === 200) {
          this.props.showNotification(
            "success",
            this.props.intl.formatMessage(
              { id: "app.fieldSaved" },
              {
                field: this.props.intl.formatMessage({ id: "account." + field })
              }
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

  saveBio = () =>
    this.saveAccount({ bio: this.state.bio || this.props.user.bio }, "bio");

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
          value={this.state.username || this.props.username}
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
        <React.Fragment>
          <FieldForm
            intl={this.props.intl}
            field="bio"
            data={this.props.data}
            value={this.state.bio || this.props.user.bio}
            handleValueUpdate={this.handleBioChange}
          />
          <h5>
            <FormattedMessage id="app.preview" />
          </h5>
          <div className="notes">
            <div className="filename">
              <FormattedMessage id="account.bio" />
            </div>
            <Markdown source={this.state.bio || this.props.user.bio} />
          </div>
        </React.Fragment>
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
    if (activeStep === 5) return null;
    let step = this.getStepContent(activeStep);
    return (
      <React.Fragment>
        <Breadcrumbs>
          <FormattedMessage id="app.welcome" />
        </Breadcrumbs>
        <div className="wrap narrow">
          <h1 className="txt-center">
            <FormattedMessage id="app.welcome" />
          </h1>
          <h4 className="txt-center">
            <FormattedMessage id="app.letUsSetupYourAccount" />
          </h4>
          <form>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              classes={{ root: "nobg" }}
              nextButton={
                <Button size="small" color="primary" onClick={this.handleNext}>
                  <FormattedMessage id="app.continue" />
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  color="primary"
                  onClick={this.handleBack}
                  disabled={activeStep === 0}
                >
                  <KeyboardArrowLeft />
                  <FormattedMessage id="app.back" />
                </Button>
              }
            />
            {step.content}
            <p className="txt-center mt1">
              <Button
                color="primary"
                variant="contained"
                onClick={this.handleNext}
              >
                <FormattedMessage id="app.continue" />
                <KeyboardArrowRight className="ml1" />
              </Button>
            </p>
          </form>
          <blockquote>
            <FormattedHTMLMessage id={"account." + step.key + "Info"} />
          </blockquote>
          {step.key === "bio"
            ? [
                <TrayTitle icon={<WhyIcon />}>
                  {
                    this.props.data.markdownHelp["/docs/markdown"].frontmatter
                      .title
                  }
                </TrayTitle>,
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.props.data.markdownHelp["/docs/markdown"].html
                  }}
                />
              ]
            : ""}
        </div>
      </React.Fragment>
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

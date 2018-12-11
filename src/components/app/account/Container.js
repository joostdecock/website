import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { setUserAccount } from "../../../store/actions/user";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";
import FieldForm from "./FieldForm";
import Button from "@material-ui/core/Button";
import BackIcon from "@material-ui/icons/KeyboardArrowLeft";
import SaveIcon from "@material-ui/icons/Save";
import backend from "../../../backend";
import { scrollToTop } from "../../../utils";
import Breadcrumbs from "../../Breadcrumbs";
import Tray from "../../Tray";
import TrayTitle from "../../TrayTitle";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import { FormattedHTMLMessage } from "react-intl";
import WhyIcon from "@material-ui/icons/Help";
import remark from "remark";
import html from "remark-html";
import CodeIcon from "@material-ui/icons/Code";
import AccountView from "./AccountView";

class AccountContainer extends React.Component {
  state = {
    editing: false,
    username: false,
    password: "******************",
    email: false,
    bio: false,
    avatar: false,
    avatarUri: false,
    units: false,
    language: false,
    github: false,
    twitter: false,
    instagram: false,
    profile: false,
    model: false,
    openData: false,
    loadedAvatar: false,
    markdownPreview: ""
  };

  componentDidMount() {
    this.userToState();
  }

  componentDidUpdate() {
    if (this.state.editing) scrollToTop();
  }

  userToState() {
    let user = this.props.user;
    this.renderMarkdownPreview(user.bio);
    this.setState({
      username: user.username,
      email: user.email,
      bio: user.bio,
      avatar: user.picture,
      avatarUri: user.pictureUris.xs + "?cachebust=" + Date.now(),
      units: user.settings.units,
      language: user.settings.language,
      github:
        typeof user.social === "undefined" ? "" : user.social.github || "",
      twitter:
        typeof user.social === "undefined" ? "" : user.social.twitter || "",
      instagram:
        typeof user.social === "undefined" ? "" : user.social.instagram || "",
      patron: user.patron,
      profile: user.consent.profile,
      model: user.consent.model,
      openData: user.consent.openData,
      editing: false
    });
  }

  renderMarkdownPreview(markdown) {
    let self = this;
    remark()
      .use(html)
      .process(markdown, (err, md) => {
        self.setState({
          markdownPreview: md.contents
        });
      });
  }

  handleStartEditing = key => {
    this.setState({
      editing: key
    });
  };

  handleStopEditing = () => {
    this.userToState();
  };

  handleAvatarLoad = avatar => {
    this.setState({
      loadedAvatar: avatar
    });
  };

  saveAccount = (data, field) => {
    backend
      .saveAccount(data)
      .then(res => {
        if (res.status === 200) {
          let msg = this.props.intl.formatMessage(
            { id: "app.fieldSaved" },
            { field: this.props.intl.formatMessage({ id: "account." + field }) }
          );
          if (field === "email")
            msg +=
              "<br />" +
              this.props.intl.formatMessage({
                id: "app.checkInboxClickLinkInConfirmationEmail"
              });
          if (field === "avatar") {
            this.setState({
              avatarUri:
                res.data.account.pictureUris.xs + "?cachebust=" + Date.now()
            });
          }
          this.props.showNotification("success", msg);
          this.props.setUserAccount(res.data.account);
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
      });
  };

  handleValueSave = evt => {
    evt.preventDefault();
    let field = evt.target.attributes["data-field"].value;
    this.setState({
      editing: false
    });
    let data = {};
    switch (field) {
      case "username":
      case "email":
      case "bio":
        data[field] = this.state[field];
        this.saveAccount(data, field);
        break;
      case "password":
        data = {
          newPassword: evt.target.elements.namedItem("newPassword").value,
          currentPassword: evt.target.elements.namedItem("currentPassword")
            .value
        };
        this.saveAccount(data, field);
        break;
      case "units":
      case "language":
        data.settings = {};
        data.settings[field] = this.state[field];
        this.saveAccount(data, field);
        break;
      case "github":
      case "twitter":
      case "instagram":
        data.social = {};
        data.social[field] = this.state[field];
        this.saveAccount(data, field);
        break;
      case "avatar":
        data = new FormData();
        data.append("picture", this.state.loadedAvatar);
        return this.saveAccount(data, "avatar");
      default:
        return "";
    }
  };

  handleValueUpdate = evt => {
    let value = evt.target.value; // Needed because setState is async
    let newState = { ...this.state };
    newState[this.state.editing] = value;
    this.setState(state => newState);
    if (this.state.editing === "bio") this.renderMarkdownPreview(value);
  };

  render() {
    return (
      <div>
        <Breadcrumbs>
          <FormattedMessage id="app.settings" />
        </Breadcrumbs>
        <h1>
          <FormattedMessage id="app.settings" />
        </h1>
        {!this.state.editing ? (
          <AccountView
            location={this.props.location}
            language={this.props.language}
            handleStartEditing={this.handleStartEditing}
            {...this.state}
          />
        ) : (
          <TwoColumns>
            <Column>
              <form
                onSubmit={this.handleValueSave}
                data-field={this.state.editing}
              >
                <FieldForm
                  intl={this.props.intl}
                  field={this.state.editing}
                  value={this.state[this.state.editing]}
                  handleValueUpdate={this.handleValueUpdate}
                  handleAvatarLoad={this.handleAvatarLoad}
                  data={this.props.data}
                  location={this.props.location}
                />
                <div className="txt-right">
                  <Button
                    onClick={this.handleStopEditing}
                    className="mr1"
                    variant="outlined"
                  >
                    <BackIcon />
                    <FormattedMessage id="app.back" />
                  </Button>
                  {this.state.editing === "patron" ? (
                    ""
                  ) : (
                    <Button type="submit" variant="contained" color="primary">
                      <SaveIcon className="mr1" />
                      <FormattedMessage id="app.save" />
                    </Button>
                  )}
                </div>
                {this.state.editing === "bio" ? (
                  <Tray
                    className="mt1 force-expanded"
                    title={<FormattedMessage id="app.preview" />}
                    icon={<CodeIcon />}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.state.markdownPreview
                      }}
                    />
                  </Tray>
                ) : (
                  ""
                )}
              </form>
            </Column>

            <Column right>
              <Tray
                className="my1 always-expanded"
                icon={<WhyIcon />}
                title={<FormattedMessage id="app.whatIsThis" />}
              >
                <p>
                  <FormattedHTMLMessage
                    id={"account." + this.state.editing + "Info"}
                  />
                </p>
                {this.state.editing === "bio"
                  ? [
                      <TrayTitle icon={<WhyIcon />}>
                        {
                          this.props.data.markdownHelp["/docs/markdown"]
                            .frontmatter.title
                        }
                      </TrayTitle>,
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.props.data.markdownHelp["/docs/markdown"]
                            .html
                        }}
                      />
                    ]
                  : ""}
              </Tray>
            </Column>
          </TwoColumns>
        )}
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
    dispatch(showNotification(style, message)),
  closeNotification: () => dispatch(closeNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AccountContainer));

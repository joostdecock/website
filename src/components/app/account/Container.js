import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { setUserAccount } from "../../../store/actions/user";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import UsernameIcon from "@material-ui/icons/PermIdentity";
import EmailIcon from "@material-ui/icons/Email";
import GotoIcon from "@material-ui/icons/KeyboardArrowRight";
import ExportIcon from "@material-ui/icons/CloudDownload";
import PauseIcon from "@material-ui/icons/PauseCircleFilled";
import RemoveIcon from "@material-ui/icons/DeleteForever";
import PasswordIcon from "@material-ui/icons/VpnKey";
import EditIcon from "@material-ui/icons/Edit";
import TwitterIcon from "../../TwitterIcon";
import InstagramIcon from "../../InstagramIcon";
import GithubIcon from "../../GithubIcon";
import UnitsIcon from "@material-ui/icons/Public";
import LanguageIcon from "@material-ui/icons/Translate";
import PatronIcon from "@material-ui/icons/Favorite";
import ConsentIcon from "@material-ui/icons/DoneAll";
import BioIcon from "@material-ui/icons/ChatBubbleOutline";
import SocialLink from "../../SocialLink";
import FieldInfo from "./FieldInfo";
import FieldForm from "./FieldForm";
import Button from "@material-ui/core/Button";
import BackIcon from "@material-ui/icons/KeyboardArrowLeft";
import SaveIcon from "@material-ui/icons/Save";
import LinkIcon from "@material-ui/icons/Link";
import backend from "../../../backend";
import { locLang, scrollToTop } from "../../../utils";
import { Link } from "gatsby";
import Avatar from "@material-ui/core/Avatar";
import Breadcrumbs from "../../Breadcrumbs";
import Tray from "../../Tray";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";

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
    loadedAvatar: false
  };

  componentDidMount() {
    this.userToState();
  }

  componentDidUpdate() {
    if (this.state.editing) scrollToTop();
  }

  userToState() {
    let user = this.props.user;
    this.setState({
      ...this.state,
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

  handleStartEditing = key => {
    this.setState({
      ...this.state,
      editing: key
    });
  };

  handleStopEditing = () => {
    this.userToState();
  };

  handleAvatarLoad = avatar => {
    this.setState({
      ...this.state,
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
              ...this.state,
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
      ...this.state,
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
  };

  formatValue = (field, value) => {
    switch (field) {
      case "language":
        return <FormattedMessage id={"i18n." + value} />;
      case "patron":
        if (value === 2)
          return [
            <FormattedMessage id="app.patron-2" key="msg" />,
            <span key="emoji" role="img" aria-label=":)">
              {" "}
              😀{" "}
            </span>
          ];
        if (value === 4)
          return [
            <FormattedMessage id="app.patron-4" key="msg" />,
            <span key="emoji" role="img" aria-label=":)">
              {" "}
              😘
            </span>
          ];
        if (value === 8)
          return [
            <FormattedMessage id="app.patron-8" key="msg" />,
            <span key="emoji" role="img" aria-label=":D">
              {" "}
              😍
            </span>
          ];
        return [
          <FormattedMessage id="app.no" key="msg" />,
          <span key="emoji" role="img" aria-label=":(">
            {" "}
            😞{" "}
          </span>
        ];
      case "units":
        return value ? <FormattedMessage id={"app." + value + "Units"} /> : "";
      case "github":
      case "twitter":
      case "instagram":
        if (value === "") return value;
        else return <SocialLink site={field} account={value} />;
      case "email":
        if (value !== this.props.user.email)
          return (
            <span>
              {value}{" "}
              <em>
                (<FormattedMessage id="app.pendingConfirmation" />)
              </em>
            </span>
          );
        else return value;
      default:
        return value;
    }
  };

  patronValue = rank => {
    if (rank === 2) return [<FormattedMessage id="app.patron-2" />, " 😀"];
    if (rank === 4) return [<FormattedMessage id="app.patron-4" />, " 😘"];
    if (rank === 8) return [<FormattedMessage id="app.patron-8" />, " 😍"];
    return [<FormattedMessage id="app.no" />, " 😞"];
  };

  items = [
    {
      key: "username",
      icon: <UsernameIcon />
    },
    {
      key: "email",
      icon: <EmailIcon />
    },
    {
      key: "password",
      icon: <PasswordIcon />
    },
    {
      key: "bio",
      icon: <BioIcon />
    },
    {
      key: "avatar"
    },
    {
      key: "units",
      icon: <UnitsIcon />
    },
    {
      key: "language",
      icon: <LanguageIcon />
    },
    {
      key: "github",
      icon: <GithubIcon />
    },
    {
      key: "twitter",
      icon: <TwitterIcon />
    },
    {
      key: "instagram",
      icon: <InstagramIcon />
    },
    {
      key: "patron",
      icon: <PatronIcon />,
      noSave: true
    }
  ];

  related = [
    {
      key: "export",
      to: "/account/export",
      icon: <ExportIcon />,
      label: "exportYourData"
    },
    {
      key: "consent",
      to: "/account/consent",
      icon: <ConsentIcon />,
      label: "reviewYourConsent"
    },
    {
      key: "restrict",
      to: "/account/restrict",
      icon: <PauseIcon />,
      label: "restrictProcessingOfYourData"
    },
    {
      key: "remove",
      to: "/account/remove",
      icon: <RemoveIcon />,
      label: "removeYourAccount"
    }
  ];

  render() {
    let items = this.items;
    let related = this.related;
    let edit = this.state.editing;
    return (
      <div>
        <Breadcrumbs>
          <FormattedMessage id="app.settings" />
        </Breadcrumbs>
        <h1>
          <FormattedMessage id="app.settings" />
        </h1>
        <TwoColumns>
          <Column>
            {edit !== false ? (
              <form onSubmit={this.handleValueSave} data-field={edit}>
                <FieldForm
                  intl={this.props.intl}
                  field={edit}
                  value={this.state[edit]}
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
                  {edit === "patron" ? (
                    ""
                  ) : (
                    <Button type="submit" variant="contained" color="primary">
                      <SaveIcon className="mr1" />
                      <FormattedMessage id="app.save" />
                    </Button>
                  )}
                </div>
              </form>
            ) : (
              <div className="overpad1">
                <List component="nav">
                  {items.map((item, index) => (
                    <ListItem
                      button
                      key={"settingitem-" + index}
                      onClick={() => this.handleStartEditing(item.key)}
                    >
                      <ListItemIcon>
                        {item.key === "avatar" ? (
                          <Avatar
                            src={this.state.avatarUri}
                            alt="avatar"
                            className="m24"
                          />
                        ) : (
                          item.icon
                        )}
                      </ListItemIcon>
                      <ListItemText>
                        <div className="keyval">
                          <span className="key" key={"key-" + index}>
                            <FormattedMessage id={"account." + item.key} />
                          </span>
                          <span className="val" key={"val-" + index}>
                            {this.formatValue(item.key, this.state[item.key])}
                          </span>
                        </div>
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton
                          aria-label="Comments"
                          onClick={() => this.handleStartEditing(item.key)}
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </div>
            )}
          </Column>
          <Column side="right">
            {edit !== false ? (
              <FieldInfo intl={this.props.intl} field={edit} />
            ) : (
              <Tray
                className="my1 stick always-expanded"
                icon={<LinkIcon />}
                title={<FormattedMessage id="app.relatedLinks" />}
              >
                <List className="overpad1">
                  {related.map((item, index) => (
                    <Link
                      to={locLang.set(
                        item.to,
                        locLang.get(this.props.location)
                      )}
                      className="nodec"
                      key={"link" + index}
                    >
                      <ListItem button>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>
                          <FormattedMessage id={"account." + item.label} />
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <IconButton>
                            <GotoIcon color="primary" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Tray>
            )}
          </Column>
        </TwoColumns>
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

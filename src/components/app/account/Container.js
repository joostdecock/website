import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { setUserAccount } from "../../../store/actions/user";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import UsernameIcon from "@material-ui/icons/PermIdentity";
import EmailIcon from "@material-ui/icons/Email";
import PasswordIcon from "@material-ui/icons/VpnKey";
import EditIcon from "@material-ui/icons/Edit";
import TwitterIcon from "../../TwitterIcon";
import InstagramIcon from "../../InstagramIcon";
import GithubIcon from "../../GithubIcon";
import UnitsIcon from "@material-ui/icons/Public";
import LanguageIcon from "@material-ui/icons/Translate";
import PatronIcon from "@material-ui/icons/Favorite";
import ConsentIcon from "@material-ui/icons/CheckCircleOutline";
import Switch from "@material-ui/core/Switch";

import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

class AccountContainer extends React.Component {
  state = {};

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

  patronValue = rank => {
    if (rank === 2) return [<FormattedMessage id="app.patron-2" />, " 😀"];
    if (rank === 4) return [<FormattedMessage id="app.patron-4" />, " 😘"];
    if (rank === 8) return [<FormattedMessage id="app.patron-8" />, " 😍"];
    return [<FormattedMessage id="app.no" />, " 😞"];
  };

  items = [
    {
      key: "username",
      label: "username",
      icon: <UsernameIcon />,
      value: this.props.user.username
    },
    {
      key: "email",
      label: "emailAddress",
      icon: <EmailIcon />,
      value: this.props.user.email
    },
    {
      key: false,
      label: "password",
      icon: <PasswordIcon />,
      value: "****************"
    },
    {
      key: "units",
      label: "units",
      icon: <UnitsIcon />,
      value: this.props.user.settings.units
    },
    {
      key: "language",
      label: "language",
      icon: <LanguageIcon />,
      value: this.props.user.settings.language
    },
    {
      key: "github",
      label: "github",
      icon: <GithubIcon />,
      value: this.props.user.social.github || ""
    },
    {
      key: "twitter",
      label: "twitter",
      icon: <TwitterIcon />,
      value: this.props.user.social.twitter || ""
    },
    {
      key: "instagram",
      label: "instagram",
      icon: <InstagramIcon />,
      value: this.props.user.social.instagram || ""
    },
    {
      key: "patron",
      label: "patron",
      icon: <PatronIcon />,
      value: this.patronValue(this.props.user.patron)
    }
  ];

  consent = [
    {
      key: "consentForProfileData",
      label: "consentForProfileData",
      icon: <ConsentIcon />,
      value: this.patronValue(this.props.user.patron)
    },
    {
      key: "consentForModelData",
      label: "consentForModelData",
      icon: <PatronIcon />,
      value: this.patronValue(this.props.user.patron)
    }
  ];

  render() {
    let items = this.items;
    let consent = this.consent;
    let content = [];
    return (
      <div className="content">
        <h1>
          <FormattedMessage id="app.settings" />
        </h1>
        <div className="overpad1">
          <List component="nav">
            {items.map((item, index) => (
              <ListItem button key={"item-" + index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>
                  <div className="keyval">
                    <span className="key">
                      <FormattedMessage id={"app." + item.label} />
                    </span>
                    <span className="val">{item.value}</span>
                  </div>
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton aria-label="Comments">
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            {consent.map((item, index) => (
              <ListItem button key={"item-" + index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>
                  <div className="keyval">
                    <span className="key">
                      <FormattedMessage id={"gdpr." + item.label} />
                    </span>
                  </div>
                </ListItemText>
                <ListItemSecondaryAction>
                  <Switch checked={item.value} color="primary" />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  setUserAccount: account => dispatch(setUserAccount(account))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AccountContainer));

import React from "react";
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
import LinkIcon from "@material-ui/icons/Link";
import { locLang } from "../../../utils";
import { Link } from "gatsby";
import Avatar from "@material-ui/core/Avatar";
import Tray from "../../Tray";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import { FormattedMessage } from "react-intl";

const AccountView = props => {
  let { location, handleStartEditing } = props;

  const formatValue = (field, value) => {
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
        if (value !== props.email)
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

  const accountItems = [
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

  const related = [
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

  let items = accountItems;
  return (
    <TwoColumns>
      <Column>
        <div className="overpad1">
          <List component="nav">
            {items.map((item, index) => (
              <ListItem
                button
                key={"settingitem-" + index}
                onClick={() => handleStartEditing(item.key)}
              >
                <ListItemIcon>
                  {item.key === "avatar" ? (
                    <Avatar
                      src={props.avatarUri}
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
                      {formatValue(item.key, props[item.key])}
                    </span>
                  </div>
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Comments"
                    onClick={() => handleStartEditing(item.key)}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </Column>
      <Column right>
        <Tray
          className="my1 stick always-expanded"
          icon={<LinkIcon />}
          title={<FormattedMessage id="app.relatedLinks" />}
        >
          <List className="overpad1">
            {related.map((item, index) => (
              <Link
                to={locLang.set(item.to, locLang.get(location))}
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
      </Column>
    </TwoColumns>
  );
};

export default AccountView;

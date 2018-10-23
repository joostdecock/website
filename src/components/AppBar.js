import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import DropDownButton from "./DropDownButton";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import { slugForLanguage } from "../utils";
import { FormattedMessage, injectIntl } from "react-intl";
import DarkIcon from "@material-ui/icons/Brightness3";
import LightIcon from "@material-ui/icons/WbSunny";
import LoginIcon from "@material-ui/icons/VpnKey";
import BlogIcon from "@material-ui/icons/ImportContacts";
import SignupIcon from "@material-ui/icons/PersonAdd";
import {
  languageMenu,
  communityMenu,
  documentationMenu
} from "../config/menus";

const styles = {
  grow: {
    flexGrow: 1
  }
};

function FsAppBar(props) {
  const { dark, language, intl, user, setUserAccount } = props;
  let darkModeIcon = (
    <DarkIcon style={{ fontSize: "28px", transform: "rotate(35deg)" }} />
  );
  if (dark) darkModeIcon = <LightIcon style={{ fontSize: "28px" }} />;
  let userMenu = "";
  if (user) {
    userMenu = [
      <DropDownButton
        language={language}
        text={"@" + user.username}
        items={[
          {
            link: slugForLanguage("/draft/", language),
            label: "app.newDraft",
            icon: "insert_drive_file"
          },
          {
            link: slugForLanguage("/model/", language),
            label: "app.newModel",
            icon: "perm_identity"
          },
          "divider",
          {
            link: slugForLanguage("/drafts/", language),
            label: "app.drafts",
            icon: "folder_open"
          },
          {
            link: slugForLanguage("/models/", language),
            label: "app.models",
            icon: "perm_contact_calendar"
          },
          {
            link: slugForLanguage("/settings/", language),
            label: "app.settings",
            icon: "tune"
          },
          {
            link: slugForLanguage("/user/" + user.username, language),
            label: "app.profile",
            icon: "fingerprint"
          },
          "divider",
          {
            onClick: () => setUserAccount(false),
            label: "app.logOut",
            icon: "power_settings_new"
          }
        ]}
      />
    ];
  } else {
    userMenu = [
      <Button
        href={slugForLanguage("/login", language)}
        color="inherit"
        title={intl.formatMessage({ id: "app.logIn" })}
        className="not-on-mobile"
        key="login"
      >
        <LoginIcon className="mr10" />
        <FormattedMessage id="app.logIn" />
      </Button>,
      <Button
        href={slugForLanguage("/signup", language)}
        color="inherit"
        title={intl.formatMessage({ id: "app.signUp" })}
        className="not-on-mobile"
        key="signup"
      >
        <SignupIcon className="mr10" />
        <FormattedMessage id="app.signUp" />
      </Button>
    ];
  }
  return (
    <AppBar color="secondary" elevation={0}>
      <Toolbar>
        <Button
          color="inherit"
          href={slugForLanguage("/", language)}
          size="small"
          title={intl.formatMessage({ id: "app.freesewing" })}
        >
          <Logo size={38} className="mr10" />
          <span className="not-on-xs">
            <FormattedMessage id="app.freesewing" />
          </span>
        </Button>
        <div className="not-on-mobile">
          <Button
            color="inherit"
            href={slugForLanguage("/blog/", language)}
            title={intl.formatMessage({ id: "app.blog" })}
          >
            <BlogIcon className="mr10" />
            <FormattedMessage id="app.blog" />
          </Button>
          <DropDownButton
            language={language}
            title={intl.formatMessage({ id: "app.docs" })}
            {...documentationMenu(language)}
          />
          <DropDownButton
            language={language}
            title={intl.formatMessage({ id: "app.language" })}
            {...communityMenu(language)}
          />
        </div>
        {userMenu}
        <span style={styles.grow} />
        <DropDownButton
          title={intl.formatMessage({ id: "app.language" })}
          language={language}
          {...languageMenu(props.slug, language)}
        />
        <Button
          color="inherit"
          onClick={props.toggleDarkMode}
          title={intl.formatMessage({ id: "app.darkMode" })}
          size="small"
        >
          {darkModeIcon}
        </Button>
        <div className="only-on-mobile">
          <MobileMenu
            language={language}
            dark={dark}
            intl={intl}
            toggleDarkMode={props.toggleDarkMode}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

FsAppBar.propTypes = {
  dark: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  setUserAccount: PropTypes.func.isRequired
};

export default withStyles(styles)(injectIntl(FsAppBar));

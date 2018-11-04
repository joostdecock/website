import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import DropDownButton from "./DropDownButton";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import { locLang } from "../utils";
import { FormattedMessage, injectIntl } from "react-intl";
import DarkIcon from "@material-ui/icons/Brightness3";
import LightIcon from "@material-ui/icons/WbSunny";
import LoginIcon from "@material-ui/icons/VpnKey";
import BlogIcon from "@material-ui/icons/ImportContacts";
import SignupIcon from "@material-ui/icons/PersonAdd";
import {
  languageMenu,
  communityMenu,
  documentationMenu,
  getUserMenuItems
} from "../config/menus";

const styles = {
  grow: {
    flexGrow: 1
  }
};

function FsAppBar(props) {
  const { dark, language, intl, user, handleLogout } = props;
  let darkModeIcon = (
    <DarkIcon style={{ fontSize: "28px", transform: "rotate(35deg)" }} />
  );
  if (dark) darkModeIcon = <LightIcon style={{ fontSize: "28px" }} />;
  let userMenu = "";
  if (user) {
    userMenu = [
      <DropDownButton
        key="userMenu"
        language={language}
        text={"@" + user.username}
        items={getUserMenuItems(language, user.username, handleLogout)}
      />
    ];
  } else {
    userMenu = [
      <Button
        href={locLang.set("/login", language)}
        color="inherit"
        title={intl.formatMessage({ id: "app.logIn" })}
        key="login"
      >
        <LoginIcon className="mr10" />
        <FormattedMessage id="app.logIn" />
      </Button>,
      <Button
        href={locLang.set("/signup", language)}
        color="inherit"
        title={intl.formatMessage({ id: "app.signUp" })}
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
          href={locLang.set("/", language)}
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
            href={locLang.set("/blog/", language)}
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
        <div className="not-on-mobile">{userMenu}</div>
        <span style={styles.grow} />
        <DropDownButton
          title={intl.formatMessage({ id: "app.language" })}
          language={language}
          {...languageMenu(props.location, language)}
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
            user={props.user}
            handleLogout={props.handleLogout}
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
  location: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default withStyles(styles)(injectIntl(FsAppBar));

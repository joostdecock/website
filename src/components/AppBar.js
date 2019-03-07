import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import DropDownButton from "./DropDownButton";
import MobileMenu from "./MobileMenu";
import { locLang } from "../utils";
import { FormattedMessage, injectIntl } from "react-intl";
import DarkIcon from "@material-ui/icons/Brightness3";
import LightIcon from "@material-ui/icons/WbSunny";
import LoginIcon from "@material-ui/icons/VpnKey";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import SignupIcon from "@material-ui/icons/PersonAdd";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "gatsby";
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
        text={intl.formatMessage({ id: "app.account" })}
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
        <LoginIcon className="mr1" />
        <FormattedMessage id="app.logIn" />
      </Button>,
      <Button
        href={locLang.set("/signup", language)}
        color="inherit"
        title={intl.formatMessage({ id: "app.signUp" })}
        key="signup"
      >
        <SignupIcon className="mr1" />
        <FormattedMessage id="app.signUp" />
      </Button>
    ];
  }
  return (
    <nav className="appbar">
      <AppBar color="secondary" elevation={0} position="relative">
        <Toolbar>
          <Link to={locLang.set("/", language)}>
            <IconButton
              color="primary"
              title={intl.formatMessage({ id: "app.freesewing" })}
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <div className="not-on-mobile">
            <Link to={locLang.set("/patterns/", language)}>
              <Button title={intl.formatMessage({ id: "app.patterns" })}>
                <FormattedMessage id="app.patterns" />
              </Button>
            </Link>
            <DropDownButton
              language={language}
              title={intl.formatMessage({ id: "app.docs" })}
              {...documentationMenu(language)}
            />
            <DropDownButton
              language={language}
              title={intl.formatMessage({ id: "account.language" })}
              {...communityMenu(language)}
            />
          </div>
          <Link to={locLang.set("/search", language)}>
            <Button title={intl.formatMessage({ id: "app.search" })}>
              <span className="only-on-mobile">
                <SearchIcon />
              </span>
              <span className="not-on-mobile">
                <FormattedMessage id="app.search" />
              </span>
            </Button>
          </Link>
          <span style={styles.grow} />
          <div className="not-on-mobile">{userMenu}</div>
          <DropDownButton
            title={intl.formatMessage({ id: "account.language" })}
            language={language}
            {...languageMenu(props.location, language)}
          />
          <IconButton
            color="inherit"
            onClick={props.toggleDarkMode}
            title={intl.formatMessage({ id: "app.darkMode" })}
            size="small"
          >
            {darkModeIcon}
          </IconButton>
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
    </nav>
  );
}

FsAppBar.propTypes = {
  dark: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default withStyles(styles)(injectIntl(FsAppBar));

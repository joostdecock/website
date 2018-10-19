import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import DropDownButton from "./DropDownButton";
import MobileMenu from "./MobileMenu";
import { slugForLanguage } from "../utils";
import { FormattedMessage } from "react-intl";
import DarkIcon from "@material-ui/icons/Brightness3";
import LightIcon from "@material-ui/icons/WbSunny";
import LoginIcon from "@material-ui/icons/VpnKey";

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
  const { dark, language } = props;
  let darkModeIcon = (
    <DarkIcon style={{ fontSize: "28px", transform: "rotate(35deg)" }} />
  );
  if (dark) darkModeIcon = <LightIcon style={{ fontSize: "28px" }} />;
  return (
    <AppBar color="secondary" elevation={0}>
      <Toolbar>
        <Button
          color="inherit"
          href={slugForLanguage("/", language)}
          size="small"
        >
          <FormattedMessage id="app.freesewing" />
        </Button>
        <div className="not-on-mobile">
          <Button
            color="inherit"
            href={slugForLanguage("/blog/", language)}
            size="small"
          >
            <FormattedMessage id="app.blog" />
          </Button>
          <DropDownButton
            language={language}
            {...documentationMenu(language)}
          />
          <DropDownButton language={language} {...communityMenu(language)} />
        </div>
        <Button
          href={slugForLanguage("/login", language)}
          color="inherit"
          title="🔐"
          size="small"
          className="not-on-mobile"
        >
          <LoginIcon className="mr10" />
          <FormattedMessage id="app.logIn" />
        </Button>
        <span style={styles.grow} />
        <DropDownButton
          language={language}
          {...languageMenu(props.slug, language)}
        />
        <Button
          color="inherit"
          onClick={props.toggleDarkMode}
          title="🌙 &nbsp;/&nbsp; 🌞"
          size="small"
        >
          {darkModeIcon}
        </Button>
        <div className="only-on-mobile">
          <MobileMenu
            language={language}
            dark={dark}
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
  slug: PropTypes.string.isRequired
};

export default withStyles(styles)(FsAppBar);

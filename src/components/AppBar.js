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

import {
  languageMenu,
  communityMenu,
  documentationMenu
} from "../config/menus";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function FsAppBar(props) {
  const { classes, dark, language } = props;
  let darkModeIcon = (
    <DarkIcon style={{ fontSize: "32px", transform: "rotate(35deg)" }} />
  );
  if (dark) darkModeIcon = <LightIcon style={{ fontSize: "32px" }} />;
  return (
    <div className={classes.root}>
      <AppBar color="secondary" elevation={0}>
        <Toolbar>
          <Button color="inherit" href={slugForLanguage("/", language)}>
            <FormattedMessage id="app.freesewing" />
          </Button>
          <div className="not-on-mobile">
            <Button color="inherit" href={slugForLanguage("/blog/", language)}>
              <FormattedMessage id="app.blog" />
            </Button>
            <DropDownButton
              language={language}
              {...documentationMenu(language)}
            />
            <DropDownButton language={language} {...communityMenu(language)} />
          </div>
          <span style={styles.grow} />
          <DropDownButton
            language={language}
            {...languageMenu(props.slug, language)}
          />
          <Button
            color="inherit"
            onClick={props.toggleDarkMode}
            title="🌙 &nbsp;/&nbsp; 🌞"
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
    </div>
  );
}

FsAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  dark: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
};

export default withStyles(styles)(FsAppBar);

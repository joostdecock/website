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
import DarkModeIcon from "@material-ui/icons/SettingsBrightness";

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
  const { classes } = props;
  let darkModeIcon = (
    <DarkIcon style={{ fontSize: "32px", transform: "rotate(35deg)" }} />
  );
  if (props.dark) darkModeIcon = <LightIcon style={{ fontSize: "32px" }} />;
  return (
    <div className={classes.root}>
      <AppBar color="secondary" elevation={0}>
        <Toolbar>
          <Button color="inherit" href={slugForLanguage("/", props.language)}>
            <FormattedMessage id="app.freesewing" />
          </Button>
          <div className="not-on-mobile">
            <Button
              color="inherit"
              href={slugForLanguage("/blog/", props.language)}
            >
              <FormattedMessage id="app.blog" />
            </Button>
            <DropDownButton
              language={props.language}
              {...documentationMenu(props.language)}
            />
            <DropDownButton
              language={props.language}
              {...communityMenu(props.language)}
            />
          </div>
          <span style={styles.grow} />
          <DropDownButton
            language={props.language}
            {...languageMenu(props.slug, props.language)}
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
              language={props.language}
              dark={props.dark}
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
  language: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
};

export default withStyles(styles)(FsAppBar);

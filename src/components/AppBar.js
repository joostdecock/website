import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
//import CommunityMenu from "./CommunityMenu";
import DropDownButton from "./DropDownButton";
import { slugForLanguage } from "../utils";
import { FormattedMessage } from "react-intl";
import i18nConfig from "../config/i18n";
import { gitter, github, twitter, instagram } from "../data/icons";

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

  const languageMenu = {
    text: i18nConfig.translations[props.language],
    icon: { type: "inline", svg: i18nConfig.icons[props.language] },
    items: []
  };
  for (let language of i18nConfig.languages) {
    languageMenu.items.push({
      link: slugForLanguage(props.slug, language),
      text: i18nConfig.translations[language],
      icon: { type: "inline", svg: i18nConfig.icons[language] }
    });
  }

  const communityMenu = {
    label: "app.community",
    items: [
      {
        link: slugForLanguage("/showcase/", props.language),
        label: "app.showcase",
        icon: "camera_alt"
      },
      {
        link: "https://gitter.im/freesewing/freesewing",
        label: "app.chatOnGitter",
        icon: { type: "inline", svg: gitter }
      },
      {
        link: "https://github.com/freesewing",
        label: "app.github",
        icon: { type: "inline", svg: github }
      },
      {
        link: "https://twitter.com/freesewing_org",
        label: "app.twitter",
        icon: { type: "inline", svg: twitter }
      },
      {
        link: "https://instagram.com/freesewing_org",
        label: "app.instagram",
        icon: { type: "inline", svg: instagram }
      }
    ]
  };

  const documentationMenu = {
    label: "app.docs",
    items: [
      {
        link: slugForLanguage("/docs/about", props.language),
        label: "app.aboutFreesewing",
        icon: "info"
      },
      {
        link: "https://developer.freesewing.org/",
        label: "app.documentationForDevelopers",
        icon: "code"
      }
    ]
  };

  return (
    <div className={classes.root}>
      <AppBar color="secondary" elevation={0}>
        <Toolbar>
          <Button color="inherit" href={slugForLanguage("/", props.language)}>
            <FormattedMessage id="app.freesewing" />
          </Button>
          <Button
            color="inherit"
            href={slugForLanguage("/blog/", props.language)}
          >
            <FormattedMessage id="app.blog" />
          </Button>
          <DropDownButton language={props.language} {...documentationMenu} />
          <DropDownButton language={props.language} {...communityMenu} />
          <span style={styles.grow} />
          <DropDownButton language={props.language} {...languageMenu} />
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

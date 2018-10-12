import React from "react";
import i18nConfig from "./i18n";
import { slugForLanguage } from "../utils";
import TwitterIcon from "../components/TwitterIcon";
import GitterIcon from "../components/GitterIcon";
import InstagramIcon from "../components/InstagramIcon";
import GithubIcon from "../components/GithubIcon";

const languageMenu = (slug, pageLanguage) => {
  let menu = {
    text: i18nConfig.translations[pageLanguage],
    icon: { type: "inline", svg: i18nConfig.icons[pageLanguage] },
    items: []
  };
  for (let language of i18nConfig.languages) {
    menu.items.push({
      link: slugForLanguage(slug, language),
      text: i18nConfig.translations[language],
      icon: { type: "inline", svg: i18nConfig.icons[language] }
    });
  }

  return menu;
};

const communityMenu = pageLanguage => {
  return {
    label: "app.community",
    items: [
      {
        link: slugForLanguage("/showcase/", pageLanguage),
        label: "app.showcase",
        icon: "camera_alt"
      },
      {
        link: "https://gitter.im/freesewing/freesewing",
        label: "app.chatOnGitter",
        icon: { type: "component", svg: <GitterIcon /> }
      },
      {
        link: "https://github.com/freesewing",
        label: "app.github",
        icon: { type: "component", svg: <GithubIcon /> }
      },
      {
        link: "https://twitter.com/freesewing_org",
        label: "app.twitter",
        icon: { type: "component", svg: <TwitterIcon /> }
      },
      {
        link: "https://instagram.com/freesewing_org",
        label: "app.instagram",
        icon: { type: "component", svg: <InstagramIcon /> }
      }
    ]
  };
};

const documentationMenu = pageLanguage => {
  return {
    label: "app.docs",
    items: [
      {
        link: slugForLanguage("/docs/about", pageLanguage),
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
};

export { languageMenu, communityMenu, documentationMenu };

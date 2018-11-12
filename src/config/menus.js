import React from "react";
import i18nConfig from "./i18n";
import { locLang } from "../utils";
import TwitterIcon from "../components/TwitterIcon";
import GitterIcon from "../components/GitterIcon";
import InstagramIcon from "../components/InstagramIcon";
import GithubIcon from "../components/GithubIcon";

const languageMenu = (location, pageLanguage) => {
  let menu = {
    text: i18nConfig.translations[pageLanguage],
    icon: { type: "inline", svg: i18nConfig.icons[pageLanguage] },
    items: []
  };
  for (let language of i18nConfig.languages) {
    menu.items.push({
      link: locLang.set(location, language),
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
        link: locLang.set("/showcase/", pageLanguage),
        label: "app.showcase",
        icon: "camera_alt"
      },
      {
        link: "https://gitter.im/freesewing/freesewing",
        label: "app.chatOnGitter",
        icon: { type: "component", svg: <GitterIcon color="" /> }
      },
      {
        link: "https://github.com/freesewing",
        label: "app.github",
        icon: { type: "component", svg: <GithubIcon color="" /> }
      },
      {
        link: "https://twitter.com/freesewing_org",
        label: "app.twitter",
        icon: { type: "component", svg: <TwitterIcon color="" /> }
      },
      {
        link: "https://instagram.com/freesewing_org",
        label: "app.instagram",
        icon: { type: "component", svg: <InstagramIcon color="" /> }
      }
    ]
  };
};

const documentationMenu = pageLanguage => {
  return {
    label: "app.docs",
    items: [
      {
        link: locLang.set("/docs/about", pageLanguage),
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

const getUserMenuItems = (language, username, handleLogout) => {
  return [
    {
      link: locLang.set("/draft/", language),
      label: "app.newDraft",
      icon: "insert_drive_file"
    },
    {
      link: locLang.set("/model/", language),
      label: "app.newModel",
      icon: "perm_identity"
    },
    "divider",
    {
      link: locLang.set("/drafts/", language),
      label: "app.drafts",
      icon: "folder_open"
    },
    {
      link: locLang.set("/models/", language),
      label: "app.models",
      icon: "perm_contact_calendar"
    },
    {
      link: locLang.set("/account/", language),
      label: "app.settings",
      icon: "tune"
    },
    {
      link: locLang.set("/users/" + username, language),
      label: "app.profile",
      icon: "fingerprint"
    },
    "divider",
    {
      onClick: () => handleLogout(),
      label: "app.logOut",
      icon: "power_settings_new"
    }
  ];
};

export { languageMenu, communityMenu, documentationMenu, getUserMenuItems };

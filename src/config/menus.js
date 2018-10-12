import i18nConfig from "./i18n";
import { slugForLanguage } from "../utils";
import { gitter, github, twitter, instagram } from "../data/icons";

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

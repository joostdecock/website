import i18nConfig from "./config/i18n";
import { createMuiTheme } from "@material-ui/core/styles";
import themeConfig from "./config/theme";

/** Strips all whitespace and makes string lowercase */
const toId = str => str.toLowerCase().replace(/\s+/g, "");

/** Makes a string camelCase */
const camelCase = str =>
  str
    .replace(/\s(.)/g, function($1) {
      return $1.toUpperCase();
    })
    .replace(/\s/g, "")
    .replace(/^(.)/, function($1) {
      return $1.toLowerCase();
    });

/** Gets the language from a slug
 * A slug being the complete path of the URL
 * not just the last part
 * So for /en/blog/category/roundup this will return en
 */
const languageFromSlug = slug => {
  let lang = slug.split("/")[1];
  if (i18nConfig.languages.indexOf(lang) !== -1) return lang;
  else return i18nConfig.defaultLanguage;
};

/** Adatps a slug for a given language
 * A slug being the complete path of the URL
 * not just the last part
 * so if you pass this /en/blog and nl it will return /nl/blog
 * If you pass it /about and fr it will return /fr/about
 */
const slugForLanguage = (slug, language) => {
  let chunks = slug.split("/");
  if (i18nConfig.languages.indexOf(chunks[1]) !== -1) {
    let lang = chunks[1];
    return "/" + language + slug.substr(lang.length + 1);
  } else return "/" + language + slug;
};

/** Returns the location of a (markdown) file on GitHub */
const fileOnGithub = path => {
  //FIXME: This will probably break on Windows
  return (
    "https://github.com/freesewing/website/edit/develop/src/" +
    path.split("/src/")[1]
  );
};

/** Allows us to switch the theme's dark mode
 * returns a theme object configured for dark mode
 * or not, depending on the value of dark you pass it
 */
const loadTheme = dark => {
  let palette = {};
  if (dark) {
    palette = {
      primary: {
        main: "#fff"
      },
      secondary: {
        main: "#111"
      },
      type: "dark"
    };
  } else {
    palette = {
      primary: {
        main: "#111"
      },
      secondary: {
        main: "#fff"
      },
      type: "light"
    };
  }
  return createMuiTheme({ ...themeConfig, palette });
};

export {
  toId,
  camelCase,
  languageFromSlug,
  slugForLanguage,
  fileOnGithub,
  loadTheme
};

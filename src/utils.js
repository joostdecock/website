import i18nConfig from "./config/i18n";
import { createMuiTheme } from "@material-ui/core/styles";
import themeConfig from "./config/theme";
import Storage from "./storage";
import tlds from "tlds";

const storage = new Storage();

/** Stores JSON Web Token in local storage */
const saveToken = token => storage.set("token", token);

/** Returns JSON Web Token from local storage */
const retrieveToken = () => storage.get("token");

/** Clears JSON Web Token from local storage */
const clearToken = () => storage.set("token", null);

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
 * REMOVEME - DEPRECATED
 */
const languageFromSlug = slug => {
  let lang = slug.split("/")[1];
  if (i18nConfig.languages.indexOf(lang) !== -1) return lang;
  else return i18nConfig.defaultLanguage;
};

/** Gets the language from a location
 * A location being the complete path of the URL
 * not just the last part
 * So for /en/blog/category/roundup this will return en
 */
const locLang = {
  get: location => {
    let lang = location.split("/")[1];
    if (i18nConfig.languages.indexOf(lang) !== -1) return lang;
    else return i18nConfig.defaultLanguage;
  },
  set: (location, language) => {
    let chunks = location.split("/");
    if (i18nConfig.languages.indexOf(chunks[1]) !== -1) {
      let lang = chunks[1];
      return "/" + language + location.substr(lang.length + 1);
    } else return "/" + language + location;
  }
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

/** Validates an email address for correct syntax */
const validateEmail = email => {
  // eslint-disable-next-line
  let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(email, re.test(email));
  return re.test(email);
};

/** Validates the top level domain (TLT) for an email address */
const validateTld = email => {
  let tld = email
    .split("@")
    .pop()
    .split(".")
    .pop()
    .toLowerCase();
  if (tlds.indexOf(tld) === -1) return tld;
  else return true;
};

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const scrollToTop = () => {
  if (typeof window !== "undefined") window.scrollTo(0, 0);
};

export {
  scrollToTop,
  locLang,
  toId,
  camelCase,
  capitalize,
  languageFromSlug,
  slugForLanguage,
  fileOnGithub,
  loadTheme,
  saveToken,
  retrieveToken,
  clearToken,
  validateEmail,
  validateTld
};

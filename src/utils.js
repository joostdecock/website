import i18nConfig from "./config/i18n";
import { createMuiTheme } from "@material-ui/core/styles";
import themeConfig from "./config/theme";
import Storage from "./storage";
import tlds from "tlds";
import remark from "remark";
import html from "remark-html";
import { options } from "@freesewing/i18n";

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

/** Gets the language from a location
 * A location being the complete path of the URL
 * not just the last part
 * So for /en/blog/category/roundup this will return en
 */
const locLang = {
  strip: location => {
    let lang = location.split("/")[1];
    return location.substring(lang.length + 1);
  },
  get: location => {
    let lang = location.split("/")[1];
    if (i18nConfig.languages.indexOf(lang) !== -1) return lang;
    else return i18nConfig.defaultLanguage;
  },
  set: (location, language) => {
    let chunks = location.split("/");
    if (i18nConfig.languages.indexOf(chunks[1]) !== -1) {
      let lang = chunks[1];
      if (language === false) return location.substr(lang.length + 1);
      else return "/" + language + location.substr(lang.length + 1);
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

const socialLink = (user, site) => {
  if (typeof user.social === "undefined") return false;
  if (
    typeof user.social[site] === "undefined" ||
    user.social[site] === "" ||
    user.social[site] === false
  )
    return false;
  return "https://" + site + ".com/" + user.social[site];
};

const renderMarkdown = md => {
  return new Promise((resolve, reject) => {
    remark()
      .use(html)
      .process(md, (err, file) => {
        resolve(file);
      });
  });
};

const uniqueArray = array => {
  return array.filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });
};

const roundImperial = value => {
  // eslint-disable-next-line
  if (value == 0) return 0;
  let negative = false;
  let inches = 0;
  let rest = 0;
  let fraction8 = 0;
  if (value < 0) {
    value = Math.abs(value);
    negative = true;
  }
  if (value < 1) {
    rest = value;
  } else {
    inches = Math.floor(value);
    rest = value - inches;
  }
  fraction8 = Math.round(rest * 8) / 8;

  if (negative) {
    // eslint-disable-next-line
    if (parseInt(inches) == 1) return -1 - fraction8;
    else return -1 * parseInt(inches) - fraction8;
  } else return parseInt(inches) + fraction8;
};

const round = value => {
  return Math.round(value * 10) / 10;
};

const distance = {};

distance.asText = (value, units = "metric") => {
  if (units === "metric") return round(value / 10);
  else {
    // eslint-disable-next-line
    if (value == 0) return 0;
    let negative = "";
    let inches = "";
    let rest = "";
    // value = roundImperial(value / 25.4); FIXME: why round here?
    value = value / 25.4;
    if (value < 0) {
      value = value * -1;
      negative = "-";
    }
    if (Math.abs(value) < 1) {
      inches = "";
      rest = value;
    } else {
      inches = Math.floor(value);
      rest = value - inches;
    }
    inches += " ";
    let fraction64 = Math.round(rest * 64);
    // eslint-disable-next-line
    if (fraction64 == 0) return negative + inches;
    // eslint-disable-next-line
    if (fraction64 % 32 == 0) return negative + inches + fraction64 / 32 + "/2";
    // eslint-disable-next-line
    if (fraction64 % 16 == 0) return negative + inches + fraction64 / 16 + "/4";
    // eslint-disable-next-line
    if (fraction64 % 8 == 0) return negative + inches + fraction64 / 8 + "/8";
    // eslint-disable-next-line
    if (fraction64 % 4 == 0) return negative + inches + fraction64 / 4 + "/16";
    // eslint-disable-next-line
    if (fraction64 % 2 == 0) return negative + inches + fraction64 / 2 + "/32";
    else return negative + value;
  }
};

distance.asHtml = (value, units = "metric") => {
  if (units === "metric") return round(value / 10) + "cm";
  else {
    // eslint-disable-next-line
    if (value == 0) return 0;
    let negative = "";
    let inches = "";
    let rest = "";
    //value = roundImperial(value / 25.4); // FIXME: Why round here?
    value = value / 25.4;
    if (value < 0) {
      value = value * -1;
      negative = "-";
    }
    if (Math.abs(value) < 1) {
      inches = "";
      rest = value;
    } else {
      inches = Math.floor(value);
      rest = value - inches;
    }
    let fraction64 = Math.round(rest * 64);
    // eslint-disable-next-line
    if (fraction64 == 0) return negative + inches + '"';
    // eslint-disable-next-line
    if (fraction64 % 32 == 0)
      return (
        " " +
        negative +
        inches +
        " <sup>" +
        fraction64 / 32 +
        '</sup>/<sub>2</sub>"'
      );
    // eslint-disable-next-line
    if (fraction64 % 16 == 0)
      return (
        " " +
        negative +
        inches +
        " <sup>" +
        fraction64 / 16 +
        '</sup>/<sub>4</sub>"'
      );
    // eslint-disable-next-line
    if (fraction64 % 8 == 0)
      return (
        " " +
        negative +
        inches +
        " <sup>" +
        fraction64 / 8 +
        '</sup>/<sub>8</sub>"'
      );
    // eslint-disable-next-line
    if (fraction64 % 4 == 0)
      return (
        " " +
        negative +
        inches +
        " <sup>" +
        fraction64 / 4 +
        '</sup>/<sub>16</sub>"'
      );
    // eslint-disable-next-line
    if (fraction64 % 2 == 0)
      return (
        " " +
        negative +
        inches +
        " <sup>" +
        fraction64 / 2 +
        '</sup>/<sub>32</sub>"'
      );
    else return negative + value + '"';
  }
};

distance.asMm = (value, units = "metric") => {
  if (typeof value === "number")
    return value * (units === "imperial" ? 25.4 : 10);
  if (units === "metric") {
    value = Number(value);
    if (isNaN(value)) return false;
    return value * (units === "imperial" ? 25.4 : 10);
  } else {
    let chunks = value.split(" ");
    if (chunks.length === 1) {
      let val = chunks[0];
      if (!isNaN(Number(val))) return Number(val) * 25.4;
      else return imperialFractionToMm(val);
    } else if (chunks.length === 2) {
      let inches = Number(chunks[0]);
      if (isNaN(inches)) return false;
      let fraction = imperialFractionToMm(chunks[1]);
      if (fraction === false) return false;
      return inches * 25.4 + fraction;
    }
  }
  return false;
};

const imperialFractionToMm = value => {
  let chunks = value.trim().split("/");
  if (chunks.length !== 2 || chunks[1] === "") return false;
  let num = Number(chunks[0]);
  let denom = Number(chunks[1]);
  if (isNaN(num) || isNaN(denom)) return false;
  else return (num * 25.4) / denom;
};

const optionDesc = (key, pattern, language) => {
  let option = options[language][key];
  if (typeof option === "undefined") {
    return "";
  }
  if (typeof option.description === "string") return option.description;
  else if (typeof option.description[pattern] === "string")
    return option.description[pattern];
  else return option.description._default;
};

const optionType = conf => {
  if (typeof conf !== "object") return "constant";
  if (typeof conf.pct !== "undefined") return "pct";
  if (typeof conf.mm !== "undefined") return "mm";
  if (typeof conf.deg !== "undefined") return "deg";
  if (typeof conf.count !== "undefined") return "count";
  if (typeof conf.dflt !== "undefined") return "dflt";

  throw new Error("Unknown option type");
};

const optionDefault = conf => {
  let type = optionType(conf);
  if (type === "constant") return conf;
  else if (type === "pct") return conf[type] / 100;
  else return conf[type];
};

const optionValue = (val, conf) => {
  let type = optionType(conf);
  if (typeof val === "undefined") {
    if (type === "pct") return optionDefault(conf) / 100;
    else return optionDefault(conf);
  }
  if (type === "pct") return val / 100;
  return val;
};

const formatOption = (val, conf) => {
  if (typeof val === "undefined") val = optionDefault(conf);
  let type = optionType(conf);
  if (type === "pct") return round(val * 100) + "%";
  else return val;
};

const patternOption = {
  type: optionType,
  value: optionValue,
  dflt: optionDefault,
  format: formatOption
};

export {
  patternOption,
  round,
  distance,
  uniqueArray,
  renderMarkdown,
  socialLink,
  scrollToTop,
  locLang,
  toId,
  camelCase,
  capitalize,
  slugForLanguage,
  fileOnGithub,
  loadTheme,
  saveToken,
  retrieveToken,
  clearToken,
  validateEmail,
  validateTld,
  optionDesc
};

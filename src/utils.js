import i18nConfig from "./config/i18n";

const languageFromSlug = slug => {
  let lang = slug.split("/")[1];
  if (i18nConfig.languages.indexOf(lang) !== -1) return lang;
  else return i18nConfig.defaultLanguage;
};

const slugForLanguage = (slug, language) => {
  let chunks = slug.split("/");
  if (i18nConfig.languages.indexOf(chunks[1]) !== -1) {
    let lang = chunks[1];
    return "/" + language + slug.substr(lang.length + 1);
  } else return "/" + language + slug;
};

export { languageFromSlug, slugForLanguage };

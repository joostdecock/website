import React from "react";
import BaseLayout from "../layouts/Base";
import TranslationList from "../TranslationList";
import * as allTranslations from "@freesewing/i18n";
import i18nConfig from "../../config/i18n";
import Breadcrumbs from "../Breadcrumbs";

const TranslationPage = props => {
  let translation = {};
  for (let lang of i18nConfig.languages) translation[lang] = {};
  for (let topic of i18nConfig.topics) {
    for (let lang of i18nConfig.languages) {
      if (typeof allTranslations[topic] === "undefined") throw topic;
      translation[lang][topic] = allTranslations[topic][lang];
    }
  }

  let path = props["*"].substring(props.pageContext.language.length + 6);
  let keys = path.split("/");
  let link = "/i18n";
  let via = [
    {
      label: "app.i18n",
      link
    }
  ];
  let crumbs = keys.slice(0);
  crumbs.pop();
  for (let key of crumbs) {
    link += "/" + key;
    via.push({ label: key, link });
  }

  return (
    <BaseLayout>
      <Breadcrumbs via={via}>{keys.pop()}</Breadcrumbs>
      <TranslationList
        content={translation}
        language={props.pageContext.language}
        keys={path.split("/")}
      />
    </BaseLayout>
  );
};

export default TranslationPage;

import React from "react";
import BaseLayout from "../layouts/Base";
import { Link } from "gatsby";
import { FormattedMessage } from "react-intl";
import { icons } from "../../config/i18n";
import Breadcrumbs from "../Breadcrumbs";
import TwoColumns from "../TwoColumns";
import Column from "../Column";

const DocumentationIndex = props => {
  const language = props.pageContext.language;
  const docs = props.pageContext.docs[language];
  const fallback = props.pageContext.docs.en;
  const paths = Object.keys(fallback).sort();

  const docsWithPrefix = (prefix, sameLevel = false) => {
    let entries = [];
    for (let key of paths) {
      let entry = false;
      let frontmatter;
      let notTranslated = false;
      if (typeof docs[key] !== "undefined") frontmatter = docs[key].frontmatter;
      else {
        frontmatter = fallback[key].frontmatter;
        notTranslated = true;
      }
      if (key.substring(0, prefix.length) === prefix) {
        if (sameLevel) {
          if (key.substring(prefix.length).indexOf("/") === -1) {
            entry = true;
          }
        } else entry = true;
      }
      if (entry)
        entries.push({
          path: frontmatter.path,
          title: frontmatter.title,
          language: notTranslated ? "en" : language
        });
    }
    return entries;
  };

  const docsWithoutPrefix = prefixes => {
    let entries = [];
    for (let key of paths) {
      let frontmatter;
      let notTranslated = false;
      if (typeof docs[key] !== "undefined") frontmatter = docs[key].frontmatter;
      else {
        frontmatter = fallback[key].frontmatter;
        notTranslated = true;
      }
      let add = 0;
      for (let prefix of prefixes) {
        if (key.substring(0, prefix.length) !== prefix) {
          add++;
        }
      }
      if (add === 3)
        entries.push({
          path: frontmatter.path,
          title: frontmatter.title,
          language: notTranslated ? "en" : language
        });
    }
    return entries;
  };

  return (
    <BaseLayout>
      <Breadcrumbs>
        <FormattedMessage id="app.docs" />
      </Breadcrumbs>
      <h1>
        <FormattedMessage id="app.docs" />
      </h1>
      <TwoColumns>
        <Column>
          <h2>
            <FormattedMessage id="app.patternInstructions" />
          </h2>
          <ul>
            {docsWithPrefix("/docs/patterns/", true).map((page, index) => {
              return (
                <li key={"pattern-" + index}>
                  <Link to={page.path}>
                    {page.language === language ? (
                      ""
                    ) : (
                      <div
                        style={{
                          display: "inline-block",
                          paddingRight: "10px"
                        }}
                        dangerouslySetInnerHTML={{
                          __html:
                            page.language === language
                              ? icons[language]
                              : icons.en
                        }}
                      />
                    )}
                    {page.title}
                  </Link>
                  {" & "}
                  <Link to={page.path + "/options"}>
                    <FormattedMessage id="app.patternOptions" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <h2>
            <FormattedMessage id="app.howToTakeMeasurements" />
          </h2>
          <ul>
            {docsWithPrefix("/docs/measurements/", true).map((page, index) => {
              return (
                <li key={"measurement-" + index}>
                  <Link to={page.path}>
                    {page.language === language ? (
                      ""
                    ) : (
                      <div
                        style={{
                          display: "inline-block",
                          paddingRight: "10px"
                        }}
                        dangerouslySetInnerHTML={{
                          __html:
                            page.language === language
                              ? icons[language]
                              : icons.en
                        }}
                      />
                    )}
                    {page.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Column>
        <Column side="right">
          <h2>
            <FormattedMessage id="app.sewingHelp" />
          </h2>
          <ul>
            {docsWithPrefix("/docs/sewing/", true).map((page, index) => {
              return (
                <li key={"pattern-" + index}>
                  <Link to={page.path}>
                    {page.language === language ? (
                      ""
                    ) : (
                      <div
                        style={{
                          display: "inline-block",
                          paddingRight: "10px"
                        }}
                        dangerouslySetInnerHTML={{
                          __html:
                            page.language === language
                              ? icons[language]
                              : icons.en
                        }}
                      />
                    )}
                    {page.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <h2>
            <FormattedMessage id="app.other" />
          </h2>
          <ul>
            {docsWithoutPrefix([
              "/docs/sewing",
              "/docs/patterns",
              "/docs/measurements"
            ]).map((page, index) => {
              return (
                <li key={"pattern-" + index}>
                  <Link to={page.path}>
                    {page.language === language ? (
                      ""
                    ) : (
                      <div
                        style={{
                          display: "inline-block",
                          paddingRight: "10px"
                        }}
                        dangerouslySetInnerHTML={{
                          __html:
                            page.language === language
                              ? icons[language]
                              : icons.en
                        }}
                      />
                    )}
                    {page.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Column>
      </TwoColumns>
    </BaseLayout>
  );
};

export default DocumentationIndex;

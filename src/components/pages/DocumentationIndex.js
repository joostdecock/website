import React from "react";
import BaseLayout from "../layouts/Base";
import { Link } from "gatsby";
import { FormattedMessage } from "react-intl";
import { locLang } from "../../utils";
import Breadcrumbs from "../Breadcrumbs";
import Tray from "../Tray";
import TwoColumns from "../TwoColumns";
import Column from "../Column";
import BookIcon from "@material-ui/icons/Book";

const DocumentationIndex = props => {
  const { language, data } = props.pageContext;
  const docs = data.documentationList;
  const paths = Object.keys(docs).sort();

  const docsWithPrefix = (prefix, sameLevel = false) => {
    let entries = [];
    for (let key of paths) {
      let entry = false;
      let frontmatter = docs[key].frontmatter;
      let notTranslated = language === docs[key].language ? false : true;
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
      let frontmatter = docs[key].frontmatter;
      let add = 0;
      for (let prefix of prefixes) {
        if (key.substring(0, prefix.length) !== prefix) {
          add++;
        }
      }
      if (add === 4)
        entries.push({
          path: frontmatter.path,
          title: frontmatter.title
        });
    }
    return entries;
  };

  const docsList = prefix => {
    let list = [];
    for (let page of docsWithPrefix("/docs/" + prefix + "/", true)) {
      list.push(
        <li key={prefix + page.path}>
          <Link to={page.path}>{page.title}</Link>
        </li>
      );
    }

    return (
      <React.Fragment>
        <h2>
          <FormattedMessage id={prefixes[prefix]} />
        </h2>
        <ul className="inline">{list}</ul>
      </React.Fragment>
    );
  };

  const prefixes = {
    patterns: "app.patternInstructions",
    measurements: "app.howToTakeMeasurements",
    sewing: "app.sewingHelp",
    developer: "app.documentationForDevelopers"
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
        <Column wide>
          {Object.keys(prefixes).map(prefix => docsList(prefix))}
          <h2>
            <FormattedMessage id="app.other" />
          </h2>
          <ul className="inline">
            {docsWithoutPrefix([
              "/docs/sewing",
              "/docs/patterns",
              "/docs/measurements",
              "/docs/developer"
            ]).map((page, index) => {
              return (
                <li key={"docs-" + index}>
                  <Link to={page.path}>{page.title}</Link>
                </li>
              );
            })}
          </ul>
          <h2>
            <FormattedMessage id="app.allDocumentation" />
          </h2>
          <ol>
            {docsWithoutPrefix([1, 2, 3, 4]).map((page, index) => {
              return (
                <li key={"other=" + index}>
                  <Link to={page.path}>{page.path}</Link>
                  &nbsp;&raquo;&nbsp;
                  {page.title}
                </li>
              );
            })}
          </ol>
        </Column>
        <Column right narrow>
          <Tray
            title={<FormattedMessage id="app.documentationOverview" />}
            icon={<BookIcon />}
          >
            <div className="toc overpad2-always">
              <ul>
                <li>
                  <Link to={locLang.set("/docs/patterns/", language)}>
                    <FormattedMessage id="app.patternInstructions" />
                  </Link>
                </li>
                <li>
                  <Link to={locLang.set("/docs/measurements/", language)}>
                    <FormattedMessage id="app.howToTakeMeasurements" />
                  </Link>
                </li>
                <li>
                  <Link to={locLang.set("/docs/sewing/", language)}>
                    <FormattedMessage id="app.sewingHelp" />
                  </Link>
                </li>
                <li>
                  <Link to={locLang.set("/docs/developer/", language)}>
                    <FormattedMessage id="app.documentationForDevelopers" />
                  </Link>
                </li>
                <li>
                  <Link to={locLang.set("/docs/translator/", language)}>
                    <FormattedMessage id="app.documentationForTranslators" />
                  </Link>
                </li>
                <li>
                  <Link to={locLang.set("/docs/editor/", language)}>
                    <FormattedMessage id="app.documentationForEditors" />
                  </Link>
                </li>
              </ul>
            </div>
          </Tray>
        </Column>
      </TwoColumns>

      <TwoColumns>
        <Column right />
      </TwoColumns>
    </BaseLayout>
  );
};

export default DocumentationIndex;

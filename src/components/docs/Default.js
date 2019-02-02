import React from "react";
import Grid from "@material-ui/core/Grid";
import { FormattedMessage } from "react-intl";
import Tray from "../Tray";
import TocIcon from "@material-ui/icons/Bookmark";
import CustomToc from "../CustomToc";
import DocsFooter from "../DocsFooter";
import { Link } from "gatsby";
import { locLang } from "../../utils";

const DefaultDocumentation = props => {
  let customToc = false;
  if (props.location.indexOf("/docs/developer") !== -1) {
    let topic = props.location.split("/docs/developer/").pop();
    let pages = props.pages[props.language];
    let keys = [
      "start",
      "concepts",
      "install",
      "examples",
      "do",
      "config",
      "settings",
      "api",
      "extend",
      "plugins"
    ];
    let topics = {};
    for (let key of keys)
      topics[key] = pages["/docs/developer/" + key].frontmatter.title;
    customToc = (
      <CustomToc
        topic={topic}
        topics={topics}
        prefix="/docs/developer/"
        toc={props.page.tableOfContents}
        language={props.language}
      />
    );
  }

  let index = null;
  if (props.frontmatter.index) {
    index = <p>This is an index</p>;
  }

  const directoryIndex = () => {
    if (!props.frontmatter.index) return null;
    let here = locLang.strip(props.frontmatter.path);
    let depth = here.split("/").length;
    let entries = [];
    for (let path of Object.keys(props.pages)) {
      if (path.slice(0, here.length) === here) {
        if (path.split("/").length === depth + 1) {
          entries.push(
            <li key={path}>
              <Link to={locLang.set(path, props.language)}>
                {props.pages[path].frontmatter.title}
              </Link>
            </li>
          );
        }
      }
    }

    return <ul>{entries}</ul>;
  };

  let toc = true;
  if (!props.tableOfContents || props.tableOfContents.length === 0) toc = false;

  return (
    <React.Fragment>
      <Grid container direction="row" justify="flex-start" wrap="wrap-reverse">
        <Grid item xs={12} sm={10} md={7} lg={6} xl={6}>
          <article dangerouslySetInnerHTML={{ __html: props.html }} />
          {directoryIndex()}
          <DocsFooter />
          {props.pleaseTranslate}
        </Grid>
        <Grid item xs={false} sm={false} md={false} lg={1} xl={1} />
        <Grid
          item
          xs={12}
          sm={10}
          md={5}
          lg={5}
          xl={4}
          className="align-self-stretch pl1nsm"
        >
          {props.languageNotAvailable}
          {props.measurementsBox}
          {toc ? (
            <Tray
              className="mb1 stick scrollable"
              icon={<TocIcon />}
              title={
                customToc ? (
                  props.pages[props.language]["/docs/developer"].frontmatter
                    .title
                ) : (
                  <FormattedMessage id="app.contents" />
                )
              }
            >
              {customToc ? (
                <div className="toc overpad2-always">{customToc}</div>
              ) : (
                <div
                  className="toc overpad2-always"
                  dangerouslySetInnerHTML={{ __html: props.tableOfContents }}
                />
              )}
            </Tray>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DefaultDocumentation;

import React from "react";
import Grid from "@material-ui/core/Grid";
import Tray from "../Tray";
import TocIcon from "@material-ui/icons/Bookmark";
import rehypeReact from "rehype-react";
import ApiExample from "../markdown/ApiExample";
import PatternExample from "../markdown/PatternExample";
import CustomToc from "../CustomToc";

const DocumentationWithComponents = props => {
  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      "api-example": ApiExample({
        language: props.language,
        i18n: props.frontmatter.i18n
      }),
      "pattern-example": PatternExample
    }
  }).Compiler;

  let topic = false;
  let api = false;
  const topics = {};
  if (props.path.indexOf("/docs/developer/api") !== -1) {
    api = true;
    topic = props.path.split("/docs/developer/api/").pop();
    if (topic.slice(-1) === "/") topic = topic.slice(0, -1);
    let keys = [
      "attributes",
      "part",
      "path",
      "pattern",
      "point",
      "snippet",
      "store",
      "svg",
      "utils"
    ];
    for (let key of keys)
      topics[key] =
        props.pages[props.language][
          "/docs/developer/api/" + key
        ].frontmatter.title;
  } else {
    topic = props.path.split("/docs/developer/").pop();
    if (topic.slice(-1) === "/") topic = topic.slice(0, -1);
  }
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
  let devTopics = {};
  for (let key of keys)
    devTopics[key] =
      props.pages[props.language]["/docs/developer/" + key].frontmatter.title;
  return (
    <React.Fragment>
      <Grid container direction="row" justify="flex-start" wrap="wrap-reverse">
        <Grid item xs={12} sm={10} md={7} lg={6} xl={6}>
          <div className="h2-mt2">{renderAst(props.htmlAst)}</div>
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
          <div className="stick scrollable px2px">
            {api ? (
              <Tray
                className="mb1"
                icon={<TocIcon />}
                title={
                  props.pages[props.language]["/docs/developer/api"].frontmatter
                    .title
                }
              >
                <div className="overpad2-always">
                  <CustomToc
                    topic={topic}
                    topics={topics}
                    prefix="/docs/developer/api/"
                    toc={props.page.tableOfContents}
                    language={props.language}
                  />
                </div>
              </Tray>
            ) : null}
            <Tray
              className="mb1"
              icon={<TocIcon />}
              title={
                props.pages[props.language]["/docs/developer"].frontmatter.title
              }
            >
              <div className="overpad2-always">
                <CustomToc
                  topic={api ? "api" : topic}
                  topics={devTopics}
                  prefix="/docs/developer/"
                  toc={api ? "" : props.page.tableOfContents}
                  language={props.language}
                />
              </div>
            </Tray>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DocumentationWithComponents;

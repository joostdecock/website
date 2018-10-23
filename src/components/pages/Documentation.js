import React from "react";
import BaseLayout from "../layouts/Base";
import Grid from "@material-ui/core/Grid";
import PleaseTranslate from "../PleaseTranslate";
import LanguageNotAvailable from "../LanguageNotAvailable";
import { FormattedMessage } from "react-intl";
import GithubIcon from "../GithubIcon";
import { fileOnGithub } from "../../utils";

export default ({ pageContext }) => {
  const frontmatter = pageContext.node.frontmatter;
  const html = pageContext.node.html;
  const toc = pageContext.node.tableOfContents;
  let languageNotAvailable = "";
  let pleaseTranslate = "";
  if (pageContext.language !== pageContext.contentLanguage) {
    languageNotAvailable = <LanguageNotAvailable />;
    pleaseTranslate = (
      <PleaseTranslate
        filePath={pageContext.node.fileAbsolutePath}
        language={pageContext.language}
      />
    );
  }
  return (
    <BaseLayout slug={pageContext.slug}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={10} md={4} lg={3} xl={3} />
        <Grid item xs={12} sm={10} md={6} lg={5} xl={4}>
          <div className="docs">
            {languageNotAvailable}
            <h1>
              {frontmatter.title}
              &nbsp;&nbsp;
              <a href={fileOnGithub(pageContext.node.fileAbsolutePath)}>
                <GithubIcon color={"#2979ff"} />
              </a>
            </h1>
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={6} lg={3} xl={3} />
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid
          item
          xs={12}
          sm={10}
          md={4}
          lg={3}
          xl={3}
          className="align-self-stretch"
        >
          <div className="docs toc">
            <h3>
              <FormattedMessage id="app.contents" />
            </h3>
            <aside dangerouslySetInnerHTML={{ __html: toc }} />
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={6} lg={5} xl={4}>
          <div className="docs">
            <article dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={6} lg={3} xl={3}>
          <div className="docs cot">{pleaseTranslate}</div>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

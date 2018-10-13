import React from "react";
import DocumentationLayout from "../layouts/Documentation";
import Grid from "@material-ui/core/Grid";
import Message from "../Message";
import TranslateIcon from "@material-ui/icons/Translate";
import LanguageIcon from "@material-ui/icons/Language";
import { FormattedMessage } from "react-intl";
import GithubIcon from "../GithubIcon";
import { Link } from "gatsby";
import { fileOnGithub, slugForLanguage } from "../../utils";

export default ({ pageContext }) => {
  const frontmatter = pageContext.node.frontmatter;
  const html = pageContext.node.html;
  const toc = pageContext.node.tableOfContents;
  let warning = false;
  if (pageContext.language !== pageContext.contentLanguage) warning = true;
  let translate = "";
  if (warning) {
    let documentationForTranslators = (
      <Link to={slugForLanguage("/docs/i18n/", pageContext.contentLanguage)}>
        <FormattedMessage id="app.documentationForTranslators" />
      </Link>
    );
    let startTranslatingNow = (
      <a href={fileOnGithub(pageContext.node.fileAbsolutePath)}>
        <FormattedMessage id="app.startTranslatingNow" />
      </a>
    );
    translate = (
      <Message>
        <TranslateIcon />
        <h3>
          <FormattedMessage id="app.couldYouTranslateThis" />
        </h3>
        <p>
          <FormattedMessage id="app.becauseThatWouldBeReallyHelpful" />
          <br />
          <FormattedMessage
            id="app.startTranslatingNowOrRead"
            values={{
              startTranslatingNow,
              documentationForTranslators
            }}
          />
        </p>
      </Message>
    );
  }
  return (
    <DocumentationLayout slug={pageContext.slug}>
      <Grid container direction="row" justify="center" alignItems="top">
        <Grid item xs={12} sm={10} md={4} lg={3} xl={3} />
        <Grid item xs={12} sm={10} md={7} lg={5} xl={4}>
          <div className="docs">
            <Message show={warning} type="warning">
              <LanguageIcon />
              <h3>
                <FormattedMessage id="app.thisContentIsNotAvailableInLanguage" />
              </h3>
              <p>
                <FormattedMessage id="app.contentLocaleFallback" />
              </p>
            </Message>
            <h1>
              {frontmatter.title}
              &nbsp;&nbsp;
              <a
                href={fileOnGithub(pageContext.node.fileAbsolutePath)}
                target="_BLANK"
              >
                <GithubIcon color={"#2979ff"} />
              </a>
            </h1>
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={0} lg={3} xl={3} />
      </Grid>
      <Grid container direction="row" justify="center" alignItems="top">
        <Grid item xs={12} sm={10} md={4} lg={3} xl={3}>
          <div className="docs toc">
            <h3>
              <FormattedMessage id="app.contents" />
            </h3>
            <aside dangerouslySetInnerHTML={{ __html: toc }} />
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={7} lg={5} xl={4}>
          <div className="docs">
            <article dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </Grid>
        <Grid item xs={12} sm={10} md={0} lg={3} xl={3}>
          <div className="docs cot">{translate}</div>
        </Grid>
      </Grid>
    </DocumentationLayout>
  );
};

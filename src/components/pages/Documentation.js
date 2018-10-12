import React from "react";
import DocumentationLayout from "../layouts/Documentation";
import Grid from "@material-ui/core/Grid";
import Warning from "../Warning";
import Translate from "@material-ui/icons/Translate";
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
    translate = (
      <div>
        <h3>
          <FormattedMessage id="app.translateThisContent" />
        </h3>
        <p>
          <FormattedMessage id="app.translatorPitch" />
        </p>
        <ul>
          <li>
            <Link
              to={slugForLanguage("/docs/i18n/", pageContext.contentLanguage)}
            >
              <FormattedMessage id="app.documentationForTranslators" />
            </Link>
          </li>
          <li>
            <a
              href={fileOnGithub(pageContext.node.fileAbsolutePath)}
              target="_BLANK"
            >
              <FormattedMessage id="app.translateThisContent" />
            </a>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <DocumentationLayout slug={pageContext.slug}>
      <Grid container direction="row" justify="center" alignItems="top">
        <Grid item xs={12} sm={10} md={4} lg={3} xl={3} />
        <Grid item xs={12} sm={10} md={7} lg={5} xl={4}>
          <div className="docs">
            <Warning show={warning}>
              <Translate />
              <h3>
                <FormattedMessage id="app.thisContentIsNotAvailableInLanguage" />
              </h3>
              <p>
                <FormattedMessage id="app.contentLocaleFallback" />
              </p>
            </Warning>
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

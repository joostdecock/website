import React from "react";
import BaseLayout from "../layouts/Base";
import Grid from "@material-ui/core/Grid";
import PleaseTranslate from "../PleaseTranslate";
import LanguageNotAvailable from "../LanguageNotAvailable";
import { FormattedMessage } from "react-intl";
import GithubIcon from "../GithubIcon";
import { fileOnGithub } from "../../utils";
import Tray from "../Tray";
import TrayTitle from "../TrayTitle";
import Breadcrumbs from "../Breadcrumbs";
import TocIcon from "@material-ui/icons/Bookmark";

export default ({ pageContext }) => {
  const frontmatter = pageContext.node.frontmatter;
  const html = pageContext.node.html;
  const toc = pageContext.node.tableOfContents;
  let languageNotAvailable = "";
  let pleaseTranslate = "";
  if (pageContext.language !== pageContext.contentLanguage) {
    languageNotAvailable = (
      <LanguageNotAvailable className="mb1" language={pageContext.language} />
    );
    pleaseTranslate = (
      <PleaseTranslate
        filePath={pageContext.node.fileAbsolutePath}
        language={pageContext.language}
        className="mb1"
      />
    );
  }
  return (
    <BaseLayout>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Breadcrumbs>FIXME: {frontmatter.title}</Breadcrumbs>
        </Grid>
        <Grid item xs={12} sm={10} md={6} lg={3} xl={4} />
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        wrap="wrap-reverse"
      >
        <Grid item xs={12} sm={10} md={7} lg={6} xl={6}>
          <h1>
            {frontmatter.title}
            &nbsp;&nbsp;
            <a href={fileOnGithub(pageContext.node.fileAbsolutePath)}>
              <GithubIcon color={"#2979ff"} />
            </a>
          </h1>
          <article dangerouslySetInnerHTML={{ __html: html }} />
          {pleaseTranslate}
        </Grid>
        <Grid item xs={0} sm={0} md={0} lg={1} xl={1} />
        <Grid
          item
          xs={12}
          sm={10}
          md={5}
          lg={5}
          xl={4}
          className="align-self-stretch pl1nsm"
        >
          {languageNotAvailable}
          <Tray className="mb1 stick opaque">
            <TrayTitle icon={<TocIcon />}>
              <FormattedMessage id="app.contents" />
            </TrayTitle>
            <div dangerouslySetInnerHTML={{ __html: toc }} />
          </Tray>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

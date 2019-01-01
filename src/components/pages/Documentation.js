import React from "react";
import BaseLayout from "../layouts/Base";
import Grid from "@material-ui/core/Grid";
import PleaseTranslate from "../PleaseTranslate";
import LanguageNotAvailable from "../LanguageNotAvailable";
import OtherMeasurements from "../OtherMeasurements";
import { FormattedMessage } from "react-intl";
import GithubIcon from "../GithubIcon";
import { fileOnGithub } from "../../utils";
import Tray from "../Tray";
import Breadcrumbs from "../Breadcrumbs";
import TocIcon from "@material-ui/icons/Bookmark";
import MeasurementImages from "../MeasurementImages";

export default data => {
  const { language, page } = data.pageContext;
  const { frontmatter, html, tableOfContents, fileAbsolutePath } = page;
  let languageNotAvailable = "";
  let pleaseTranslate = "";

  let measurementsBox = "";
  let isMeasurement = false;
  let wrapReverse = true;
  let tocBox = "";
  if (language !== page.language) {
    languageNotAvailable = <LanguageNotAvailable language={language} />;
    pleaseTranslate = (
      <PleaseTranslate filePath={fileAbsolutePath} language={language} />
    );
  }
  let docsCrumb = { link: "/docs", label: "app.docs" };
  if (
    typeof frontmatter.breadcrumbs !== "undefined" &&
    typeof frontmatter.breadcrumbs[0] !== "undefined" &&
    frontmatter.breadcrumbs[0].link !== "/docs"
  )
    frontmatter.breadcrumbs.unshift(docsCrumb);
  else frontmatter.breadcrumbs = [docsCrumb];
  // Measurements
  if (typeof frontmatter.measurement === "string") {
    isMeasurement = true;
    measurementsBox = <OtherMeasurements language={language} />;
    wrapReverse = false;
  } else {
    tocBox = (
      <Tray
        className="mb1 stick"
        icon={<TocIcon />}
        title={<FormattedMessage id="app.contents" />}
      >
        <div
          className="toc"
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        />
      </Tray>
    );
  }
  console.log(frontmatter);
  return (
    <BaseLayout>
      <Breadcrumbs via={frontmatter.breadcrumbs}>
        {frontmatter.title}
      </Breadcrumbs>
      <Grid
        container
        direction="row"
        justify="flex-start"
        wrap={wrapReverse ? "wrap-reverse" : "wrap"}
      >
        <Grid item xs={12} sm={10} md={7} lg={6} xl={6}>
          <h1>
            {frontmatter.title}
            &nbsp;&nbsp;
            <a href={fileOnGithub(fileAbsolutePath)}>
              <GithubIcon color={"#2979ff"} />
            </a>
          </h1>
          {isMeasurement ? (
            <MeasurementImages measurement={frontmatter.measurement} />
          ) : (
            ""
          )}
          <article dangerouslySetInnerHTML={{ __html: html }} />
          {pleaseTranslate}
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
          {languageNotAvailable}
          {measurementsBox}
          {tocBox}
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

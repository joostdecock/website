import React from "react";
import BaseLayout from "../layouts/Base";
import Grid from "@material-ui/core/Grid";
import Image from "gatsby-image";
import { FormattedMessage } from "react-intl";
import PleaseTranslate from "../PleaseTranslate";
import LanguageNotAvailable from "../LanguageNotAvailable";
import Datum from "../Datum";
import Breadcrumbs from "../Breadcrumbs";
import { locLang } from "../../utils";
import { Link } from "gatsby";
import Tray from "../Tray";
import TocIcon from "@material-ui/icons/Bookmark";
import GithubIcon from "../GithubIcon";
import { fileOnGithub } from "../../utils";

export default data => {
  const { language, post } = data.pageContext;
  const { frontmatter, html, tableOfContents, fileAbsolutePath } = post;
  let languageNotAvailable = "";
  let pleaseTranslate = "";
  if (language !== post.language) {
    languageNotAvailable = <LanguageNotAvailable language={language} />;
    pleaseTranslate = (
      <PleaseTranslate filePath={fileAbsolutePath} language={language} />
    );
  }
  return (
    <BaseLayout>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Breadcrumbs via={[{ link: "/blog", label: "app.blog" }]}>
            {frontmatter.linktitle}
          </Breadcrumbs>
          <ul className="meta">
            <li>
              <Datum date={frontmatter.date} />
            </li>
            <li>
              <Link
                to={locLang.set(
                  "/blog/category/" + frontmatter.category,
                  language
                )}
              >
                #{frontmatter.category}
              </Link>
            </li>
          </ul>
          <figure>
            <Image
              fluid={frontmatter.img.childImageSharp.fluid}
              title={frontmatter.caption}
              alt={frontmatter.caption}
              backgroundColor={"#212121"}
              className="overpad1"
            />
            <figcaption
              dangerouslySetInnerHTML={{ __html: frontmatter.caption }}
            />
          </figure>
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
            <a href={fileOnGithub(fileAbsolutePath)}>
              <GithubIcon color={"#2979ff"} />
            </a>
          </h1>
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
          <Tray
            className="mb1 stick scrollable"
            icon={<TocIcon />}
            title={<FormattedMessage id="app.contents" />}
          >
            <div
              className="toc"
              dangerouslySetInnerHTML={{ __html: tableOfContents }}
            />
          </Tray>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

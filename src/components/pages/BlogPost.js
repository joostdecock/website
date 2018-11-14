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
import TrayTitle from "../TrayTitle";
import TocIcon from "@material-ui/icons/Bookmark";

export default data => {
  const pageContext = data.pageContext;
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
    <BaseLayout>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={10} md={4} lg={3} xl={3} />
        <Grid item xs={12} sm={10} md={7} lg={5} xl={4} className={"wmax"}>
          <Breadcrumbs via={[{ link: "/blog", label: "app.blog" }]}>
            {frontmatter.linktitle}
          </Breadcrumbs>
          <div className="blog-header">
            {languageNotAvailable}
            <figure>
              <Image
                fluid={frontmatter.img.childImageSharp.fluid}
                title={frontmatter.caption}
                alt={frontmatter.caption}
                backgroundColor={"#212121"}
              />
              <figcaption
                dangerouslySetInnerHTML={{ __html: frontmatter.caption }}
              />
            </figure>
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
          <aside className="toc">
            <Tray>
              <TrayTitle icon={<TocIcon />}>
                <FormattedMessage id="app.contents" />
              </TrayTitle>
              <div dangerouslySetInnerHTML={{ __html: toc }} />
            </Tray>
          </aside>
        </Grid>
        <Grid item xs={12} sm={10} md={7} lg={5} xl={4}>
          <div className="blog-post content">
            <ul className="meta">
              <li>
                <Datum date={frontmatter.date} />
              </li>
              <li>
                <Link
                  to={locLang.set(
                    "/blog/category/" + frontmatter.category,
                    pageContext.language
                  )}
                >
                  #{frontmatter.category}
                </Link>
              </li>
            </ul>
            <h1>{frontmatter.title}</h1>
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

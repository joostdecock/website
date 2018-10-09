import React from "react";
import BlogLayout from "../layouts/Blog";
import Grid from "@material-ui/core/Grid";
import Image from "gatsby-image";
import Warning from "../Warning";
import Translate from "@material-ui/icons/Translate";
import { FormattedMessage } from "react-intl";

export default ({ pageContext }) => {
  const frontmatter = pageContext.node.frontmatter;
  const html = pageContext.node.html;
  let warning = false;
  if (pageContext.language !== pageContext.contentLanguage) warning = true;
  return (
    <BlogLayout slug={pageContext.slug}>
      <Grid item xs={12} sm={10} md={8} lg={5} xl={5} className={"wmax"}>
        <div className="blog-header">
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
      <Grid item xs={12} sm={10} md={8} lg={5} xl={4}>
        <div className="blog-post">
          <Warning show={warning}>
            <Translate />
            <h3>
              <FormattedMessage id="app.thisContentIsNotAvailableInLanguage" />
            </h3>
            <p>
              <FormattedMessage id="app.contentLocaleFallback" />
            </p>
          </Warning>
          <ul className="meta">
            <li>{frontmatter.date}</li>
            <li>#{frontmatter.category}</li>
          </ul>
          <h1>{frontmatter.title}</h1>
          <article dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </Grid>
    </BlogLayout>
  );
};

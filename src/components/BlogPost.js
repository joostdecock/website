import React from "react"
import BlogLayout from './BlogLayout';
import Grid from '@material-ui/core/Grid';
import Image from "gatsby-image"
import LanguageWarning from "./LanguageWarning";

export default ( { pageContext } ) => {
  const frontmatter = pageContext.node.frontmatter;
  const html = pageContext.node.html;
console.log(pageContext);
  return (
  <BlogLayout>
    <Grid item xs={12} sm={10} md={8} lg={5} xl={5} className={'wmax'}>
      <div className="blog-header">
        <figure>
          <Image
            fluid={frontmatter.img.childImageSharp.fluid}
            title={frontmatter.caption}
            alt={frontmatter.caption}
            backgroundColor={'#212121'}
          />
          <figcaption dangerouslySetInnerHTML={{__html: frontmatter.caption}} />
        </figure>
      </div>
    </Grid>
    <Grid item xs={12} sm={10} md={8} lg={5} xl={4}>
      <div className="blog-post">
        <LanguageWarning
          pathLanguage={pageContext.pathLanguage}
          contentLanguage={pageContext.contentLanguage}
          file={'test'}
        />
        <ul className="meta">
          <li>{frontmatter.date}</li>
          <li>#{frontmatter.category}</li>
        </ul>
        <h1>{frontmatter.title}</h1>
        <article dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </Grid>
  </BlogLayout>
) }

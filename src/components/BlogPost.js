import React from "react"
import BlogLayout from '../components/BlogLayout';
import Grid from '@material-ui/core/Grid';
import { graphql } from "gatsby"
import Image from "gatsby-image"

export default ( { data } ) => {
  const frontmatter = data.post.frontmatter;
  const html = data.post.html;

  return (
  <BlogLayout>
    <Grid item xs={12} sm={10} md={8} lg={5} xl={5} className={'wmax'}>
      <div className="blog-header">
        <figure>
          <Image
            fluid={data.headerImage.childImageSharp.fluid}
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

export const pageQuery = graphql`
  query getBlogPost($img: String, $id: String){
    headerImage: file(relativePath: {eq: $img}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    post: markdownRemark(id: {eq: $id}) {
    frontmatter {
      title
      date(formatString: "MMMM Do, YYYY")
      path
      linktitle
      img
      caption
      author
      category
      blurb
    }
    html
  }
}`;


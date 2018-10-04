import React from "react"
import BlogPost from "../components/BlogPost"
import { graphql } from 'gatsby';

export default () => (
  <BlogPost>
  </BlogPost>
)

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`

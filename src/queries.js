const allBlogPosts = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/blog/"}}}
      sort: {fields: [frontmatter___date], order: ASC}
    ) {
    edges {
      node {
        fileAbsolutePath
        html
        id
        frontmatter {
          date(formatString: "MMMM Do, YYYY")
          path
          title
          linktitle
  			  img {
            childImageSharp {
              fluid(maxWidth: 2000) {
                 base64
                 aspectRatio
                 src
                 srcSet
                 sizes
              }
            }
          }
          caption
          author
          category
          blurb
        }
      }
    }
  }
}`;

const allShowcasePosts = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/showcase/"}}}
      sort: {fields: [frontmatter___date], order: ASC}
    ) {
    edges {
      node {
        fileAbsolutePath
        html
        id
        frontmatter {
          date(formatString: "MMMM Do, YYYY")
          path
          title
  			  img {
            childImageSharp {
              fluid(maxWidth: 2000) {
                 base64
                 aspectRatio
                 src
                 srcSet
                 sizes
              }
            }
          }
          caption
          author
          patterns
        }
      }
    }
  }
}`;

const allDocumentation = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/docs/"}}}
      sort: {fields: [frontmatter___title], order: ASC}
    ) {
    edges {
      node {
        fileAbsolutePath
        html
        tableOfContents(pathToSlugField: "frontmatter.path")
        id
        frontmatter {
          path
          title
        }
      }
    }
  }
}`;

module.exports = {
  allBlogPosts,
  allShowcasePosts,
  allDocumentation
};

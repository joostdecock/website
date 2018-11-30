const allBlogPosts = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/blog/"}}}
      sort: {fields: [frontmatter___date], order: ASC}
    ) {
    edges {
      node {
        fileAbsolutePath
        html
        tableOfContents(pathToSlugField: "frontmatter.path")
        frontmatter {
          date
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
        frontmatter {
          date
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

const showcasePreviews = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/en/showcase/"}}}
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
    edges {
      node {
        id
        frontmatter {
          path
          title
  			  img {
            childImageSharp {
              fixed(height: 220) {
                 base64
                 aspectRatio
                 src
                 srcSet
                 width
                 height
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

const blogpostPreviews = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/blog/"}}}
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
    edges {
      node {
        id
        frontmatter {
          date
          path
          title
  			  img {
            childImageSharp {
              fixed(height: 220) {
                 base64
                 aspectRatio
                 src
                 srcSet
                 width
                 height
              }
            }
          }
          caption
          author
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
        frontmatter {
          path
          title
        }
      }
    }
  }
}`;

const documentationList = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/docs/"}}}
      sort: {fields: [frontmatter___path], order: ASC}
    ) {
    edges {
      node {
        frontmatter {
          path
          title
        }
      }
    }
  }
}`;

const markdownHelp = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/docs/markdown/"}}}
      sort: {fields: [frontmatter___title], order: ASC}
    ) {
    edges {
      node {
        html
        tableOfContents(pathToSlugField: "frontmatter.path")
        frontmatter {
          path
          title
        }
      }
    }
  }
}`;

const measurementsHelp = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/docs/measurements/"}}}
      sort: {fields: [frontmatter___title], order: ASC}
    ) {
    edges {
      node {
        html
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
  allDocumentation,
  markdownHelp,
  measurementsHelp,
  showcasePreviews,
  blogpostPreviews,
  documentationList
};

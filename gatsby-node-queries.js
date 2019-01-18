const patternList = require("@freesewing/patterns").patternList;

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
          measurement
          patternOptions
          pattern
          option
          setting
        }
      }
    }
  }
}`;

const cmsDocumentation = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/docs/"}}}
      sort: {fields: [frontmatter___title], order: ASC}
    ) {
    edges {
      node {
        frontmatter {
          path
          title
          measurement
          patternOptions
          pattern
          option
          setting
        }
      }
    }
  }
}`;

const cmsBlogPosts = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/blog/"}}}
      sort: {fields: [frontmatter___date], order: ASC}
    ) {
    edges {
      node {
        frontmatter {
          date
          path
          title
          linktitle
  			  img {
            relativePath
            relativeDirectory
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

const cmsShowcasePosts = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/showcase/"}}}
      sort: {fields: [frontmatter___date], order: ASC}
    ) {
    edges {
      node {
        frontmatter {
          date
          path
          title
  			  img {
            relativePath
            relativeDirectory
          }
          caption
          author
          patterns
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

const demoHelp = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/docs/demo/"}}}
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

const optionsHelp = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/docs/patterns/"}}}
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

const settingsHelp = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/docs/draft/settings/"}}}
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

const patternCoverImages = `{
	allFile(
  	sort: { order: ASC, fields: [absolutePath] }
    filter: { relativePath: { regex: "/patterns/.*/cover.jpg/" } }
  ) {
    edges {
			node {
				relativePath
				name
				childImageSharp {
          fluid(maxWidth: 500) {
             base64
             aspectRatio
             src
             srcSet
             sizes
          }
				}
			}
		}
	}
}`;

const individualPatternCoverImages = {};
const individualPatternShowcasePreviews = {};

for (let pattern of patternList) {
  individualPatternCoverImages[pattern + "CoverImage"] = `{
  	allFile(
    	sort: { order: ASC, fields: [absolutePath] }
      filter: { relativePath: { regex: "/patterns/${pattern}/cover.jpg/" } }
    ) {
      edges {
  			node {
  				relativePath
  				name
  				childImageSharp {
            fluid(maxWidth: 500) {
               base64
               aspectRatio
               src
               srcSet
               sizes
            }
  				}
  			}
  		}
  	}
  }`;
  individualPatternShowcasePreviews[pattern + "ShowcasePreviews"] = `{
    allMarkdownRemark(
        filter: {
          frontmatter: {
            path: {regex: "/en/showcase/"}
            patterns: {eq: "${pattern}"}
          }
        }
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
                fluid(maxWidth: 500) {
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
}

module.exports = {
  allBlogPosts,
  allShowcasePosts,
  allDocumentation,
  cmsBlogPosts,
  cmsShowcasePosts,
  cmsDocumentation,
  markdownHelp,
  demoHelp,
  measurementsHelp,
  optionsHelp,
  settingsHelp,
  showcasePreviews,
  blogpostPreviews,
  documentationList,
  patternCoverImages,
  ...individualPatternCoverImages,
  ...individualPatternShowcasePreviews
};

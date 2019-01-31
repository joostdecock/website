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
        rawMarkdownBody
        tableOfContents(pathToSlugField: "frontmatter.path")
        frontmatter {
          date
          path
          title
          linktitle
  			  img {
            name
            ext
            publicURL
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
        rawMarkdownBody
        frontmatter {
          date
          path
          title
  			  img {
            name
            ext
            publicURL
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
        rawMarkdownBody
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
          components
        }
      }
    }
  }
}`;

const allDocumentationWithComponents = `{
  allMarkdownRemark(
      filter: {frontmatter: {
        path: {regex: "/docs/"}
        components: {eq: true}
      }}
      sort: {fields: [frontmatter___title], order: ASC}
    ) {
    edges {
      node {
        fileAbsolutePath
        htmlAst
        frontmatter {
          path
        	i18n {
            boxTitle
            boxInfo
            boxWhy
            i18nTitle
            i18nInfo
            i18nData
          }
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

const developerDocumentation = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/docs/developer/"}}}
      sort: {fields: [frontmatter___title], order: ASC}
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

const demoHelp = `{
  allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/docs/demo/"}}}
    ) {
    edges {
      node {
        rawMarkdownBody
        frontmatter {
          path
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

const markdownImages = `{
	allFile(
    filter: {
      absolutePath: {
      	regex: "/markdown/"
      }
      ext: {
      	regex: "/jpg|jpeg|png|gif|svg/"
      }
    }) {
    edges {
      node {
        relativePath
        publicURL
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
  developerDocumentation,
  markdownImages,
  allBlogPosts,
  allShowcasePosts,
  allDocumentation,
  allDocumentationWithComponents,
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

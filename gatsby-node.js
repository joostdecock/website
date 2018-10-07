const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve("src/components/BlogPost.js");

  const allBlogPosts = `{
    allMarkdownRemark {
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

  return graphql(allBlogPosts)
    .then(res => {
      if(res.errors) return Promise.reject(res.erros);

      Object.keys(res.data.allMarkdownRemark.edges).forEach( (key) => {
        let node = res.data.allMarkdownRemark.edges[key].node;
        if(typeof node.frontmatter !== 'undefined') {
          createPage({
            path: node.frontmatter.path,
            component: blogPostTemplate,
            context: {
              node,
              img: path.dirname(node.fileAbsolutePath)+'/'+node.frontmatter.img.name+node.frontmatter.img.ext,
              id: node.id
            }
          })
        } else {
          console.log('WARNING: Could not generate page for', Object.keys(node));
        }
      })
    })
}


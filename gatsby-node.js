const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve("src/components/BlogPost.js");

  const allBlogPosts = `{
    allMarkdownRemark {
      edges {
        node {
          html
          id
          frontmatter {
            date(formatString: "MMMM Do, YYYY")
            path
            title
            linktitle
            img
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

      res.data.allMarkdownRemark.edges.forEach( ({node}) => {
        createPage({
          path: node.frontmatter.path,
          component: blogPostTemplate,
          context: {
            node,
            img: node.frontmatter.path.substring(1)+'/'+node.frontmatter.img,
            id: node.id
          }
        })
      })
    })
}


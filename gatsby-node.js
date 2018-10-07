const i18nConfig = require("./src/config/i18n");
const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve("src/components/BlogPost.js");

  const allBlogPostsQuery = `{
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


  loadAllBlogPosts = function() {
    let posts = {};
    let languagePosts = {};
    let englishPosts = {};
    for(let lang of i18nConfig.languages) {
      posts[lang] = {};
    }

    return graphql(allBlogPostsQuery)
      .then(res => {
        if(res.errors) return Promise.reject(res.erros);
        Object.keys(res.data.allMarkdownRemark.edges).forEach( (key) => {
          let node = res.data.allMarkdownRemark.edges[key].node;
          let slug = path.basename(node.frontmatter.path);
          let language = node.frontmatter.path.split("/")[1];
          posts[language][slug] = node;
        })
        for(let lang of i18nConfig.languages) {
          languagePosts = posts[lang];
          englishPosts = posts.en;
          Object.keys(englishPosts).forEach((slug) => {
            let contentLanguage;
            let postNode;
            let origNode = languagePosts[slug];
            if(typeof languagePosts[slug] === 'undefined') {
              contentLanguage = 'en';
              postNode = englishPosts[slug];
            } else {
              contentLanguage = lang;
              postNode = languagePosts[slug];
            }
            createPage({
              path: `/${lang}/blog/${slug}`,
              component: blogPostTemplate,
              context: {
                node: postNode,
                contentLanguage,
                pathLanguage: lang
              }
            })
          })
        }

        return posts;
      })

  }

  let posts = loadAllBlogPosts();
  console.log('posts', posts);

  return graphql(allBlogPostsQuery)
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


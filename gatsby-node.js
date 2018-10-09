const i18nConfig = require("./src/config/i18n");
const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve("src/components/pages/BlogPost.js");
  const blogIndexTemplate = path.resolve("src/components/pages/BlogIndex.js");

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


  createAllBlogPosts = function() {
    let posts = {};
    let languagePosts = {};
    let englishPosts = {};
    for(let lang of i18nConfig.languages) {
      posts[lang] = {};
    }

    graphql(allBlogPostsQuery)
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
            // Create blog posts
            createPage({
              path: `/${lang}/blog/${slug}`,
              component: blogPostTemplate,
              context: {
                node: postNode,
                contentLanguage,
                language: lang,
                slug: `/${lang}/blog/${slug}`,
              }
            })
          })
          // Create blog index pages
          createPage({
            path: `/${lang}/blog`,
            component: blogIndexTemplate,
            context: {
              posts: posts,
              language: lang,
              slug: `/${lang}/blog`,
            }
          })
        }
      })

  }

  createAllBlogPosts();
}


const i18nConfig = require("./src/config/i18n");
const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions

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

  createAllBlogPosts = async function() {
    let posts = {};
    let postOrder = {};
    let languagePosts = {};
    for(let lang of i18nConfig.languages) {
      posts[lang] = {};
      postOrder[lang] = [];
    }

    graphql(allBlogPostsQuery)
      .then(res => {
        if(res.errors) return Promise.reject(res.erros);
        Object.keys(res.data.allMarkdownRemark.edges).forEach( (key) => {
          let node = res.data.allMarkdownRemark.edges[key].node;
          let slug = path.basename(node.frontmatter.path);
          let language = node.frontmatter.path.split("/")[1];
          posts[language][slug] = node;
          postOrder[language].push(slug);
          // Redirect naked path to default language
          createRedirect({
            fromPath: "/blog/"+slug,
            isPermanent: true,
            redirectInBrowser: true,
            toPath: "/"+i18nConfig.defaultLanguage+"/blog/"+slug,
          })
        })
        for(let lang of i18nConfig.languages) {
          languagePosts = posts[lang];
          for(slug of postOrder[i18nConfig.defaultLanguage]) {
            let contentLanguage;
            let postNode;
            let origNode = languagePosts[slug];
            if(typeof languagePosts[slug] === 'undefined') {
              contentLanguage = i18nConfig.defaultLanguage;
              postNode = posts[i18nConfig.defaultLanguage][slug];
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
          }
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

  /** Naked paths (without language)
    * we'll redirect these to the default language equivalent later */
  let naked = [
    '/',
    '/blog'
  ];
  // Redirects from naked paths to default language
  for(nakedPath of naked) {
    createRedirect({
      fromPath: nakedPath,
      isPermanent: true,
      redirectInBrowser: true,
      toPath: "/"+i18nConfig.defaultLanguage+nakedPath,
    })
  }

}


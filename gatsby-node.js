const i18nConfig = require("./src/config/i18n");
const queries = require("./src/queries");
const path = require("path");

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;
  const blogPostTemplate = path.resolve("src/components/pages/BlogPost.js");
  const blogIndexTemplate = path.resolve("src/components/pages/BlogIndex.js");
  const showcasePostTemplate = path.resolve(
    "src/components/pages/ShowcasePost.js"
  );
  const showcaseIndexTemplate = path.resolve(
    "src/components/pages/ShowcaseIndex.js"
  );
  const documentationTemplate = path.resolve(
    "src/components/pages/Documentation.js"
  );

  // FIXME: Add naked markdown links (/about /contact and so on)
  const naked = ["/", "/blog", "/showcase", "/login"];

  // Non-markdown content in all languages
  const jsPages = [
    {
      slug: "/",
      template: path.resolve("src/components/pages/HomePage.js")
    },
    {
      slug: "/login",
      template: path.resolve("src/components/pages/Login.js")
    },
    {
      slug: "/signup",
      template: path.resolve("src/components/pages/Signup.js")
    },
    {
      slug: "/confirm",
      match: "/confirm/*",
      template: path.resolve("src/components/pages/Confirm.js")
    },
    {
      slug: "/welcome",
      template: path.resolve("src/components/pages/Welcome.js"),
      query: queries.markdownHelp
    },
    {
      slug: "/account",
      template: path.resolve("src/components/pages/Account.js")
    }
  ];

  createBlogPostRedirect = function(slug) {
    createRedirect({
      fromPath: "/blog/" + slug,
      isPermanent: true,
      redirectInBrowser: true,
      toPath: "/" + i18nConfig.defaultLanguage + "/blog/" + slug
    });
  };

  createShowcasePostRedirect = function(slug) {
    createRedirect({
      fromPath: "/showcase/" + slug,
      isPermanent: true,
      redirectInBrowser: true,
      toPath: "/" + i18nConfig.defaultLanguage + "/showcase/" + slug
    });
  };

  createDocumentationRedirect = function(slug) {
    createRedirect({
      fromPath: slug,
      isPermanent: true,
      redirectInBrowser: true,
      toPath: "/" + i18nConfig.defaultLanguage + slug
    });
  };

  createBlogIndex = function(language, posts) {
    createPage({
      path: `/${language}/blog`,
      component: blogIndexTemplate,
      context: {
        posts,
        language,
        location: `/${language}/blog`,
        category: "all"
      }
    });
  };

  createBlogCategoryIndex = function(language, posts, category) {
    createPage({
      path: `/${language}/blog/category/${category}`,
      component: blogIndexTemplate,
      context: {
        posts,
        language,
        location: `/${language}/blog/category/${category}`,
        category: category
      }
    });
  };

  createShowcaseIndex = function(language, posts) {
    createPage({
      path: `/${language}/showcase`,
      component: showcaseIndexTemplate,
      context: {
        posts,
        language,
        location: `/${language}/showcase`
      }
    });
  };

  createBlogPost = function(language, contentLanguage, slug, node) {
    createPage({
      path: `/${language}/blog/${slug}`,
      component: blogPostTemplate,
      context: {
        node,
        contentLanguage,
        language,
        location: `/${language}/blog/${slug}`
      }
    });
  };

  createShowcasePost = function(language, contentLanguage, slug, node) {
    createPage({
      path: `/${language}/showcase/${slug}`,
      component: showcasePostTemplate,
      context: {
        node,
        contentLanguage,
        language,
        location: `/${language}/showcase/${slug}`
      }
    });
  };

  createDocumentationPage = function(language, contentLanguage, slug, node) {
    createPage({
      path: `/${language}${slug}`,
      component: documentationTemplate,
      context: {
        node,
        contentLanguage,
        language,
        location: `/${language}${slug}`
      }
    });
  };

  createJsPage = function(
    language,
    slug,
    template,
    match = false,
    query = false
  ) {
    let page = {
      path: `/${language}${slug}`,
      component: template,
      context: {
        language,
        location: `/${language}${slug}`
      }
    };
    if (match) page.matchPath = "/" + language + "/confirm/" + "*";
    if (query) {
      graphql(query).then(res => {
        page.context.data = res.data;
        createPage(page);
      });
    } else createPage(page);
  };

  createPageRedirects = function() {
    return new Promise((resolve, reject) => {
      for (nakedPath of naked) {
        createRedirect({
          fromPath: nakedPath,
          isPermanent: true,
          redirectInBrowser: true,
          toPath: "/" + i18nConfig.defaultLanguage + nakedPath
        });
      }
      return resolve();
    });
  };

  createBlogPosts = function() {
    return new Promise((resolve, reject) => {
      let posts = {};
      let postOrder = {};
      let categories = new Set();
      for (let lang of i18nConfig.languages) {
        posts[lang] = {};
        postOrder[lang] = [];
      }

      graphql(queries.allBlogPosts).then(res => {
        if (res.errors) return Promise.reject(res.errors);

        // Sort all posts into posts object and postOrder array
        Object.keys(res.data.allMarkdownRemark.edges).forEach(key => {
          let node = res.data.allMarkdownRemark.edges[key].node;
          let slug = path.basename(node.frontmatter.path);
          let language = node.frontmatter.path.split("/")[1];
          posts[language][slug] = node;
          postOrder[language].push(slug);
          categories.add(node.frontmatter.category);
          createBlogPostRedirect(slug);
        });

        // Create pages for blog posts in all languages
        for (let lang of i18nConfig.languages) {
          for (slug of postOrder[i18nConfig.defaultLanguage]) {
            let contentLanguage;
            let postNode;
            let origNode = posts[lang][slug];
            if (typeof posts[lang][slug] === "undefined") {
              // Post not available in this language, use default language instead
              contentLanguage = i18nConfig.defaultLanguage;
              postNode = posts[i18nConfig.defaultLanguage][slug];
            } else {
              contentLanguage = lang;
              postNode = posts[lang][slug];
            }
            createBlogPost(lang, contentLanguage, slug, postNode);
          }
          categories.forEach(category => {
            createBlogCategoryIndex(lang, posts, category);
          });
          createBlogIndex(lang, posts);
        }
      });
      return resolve();
    });
  };

  createShowcasePosts = function() {
    return new Promise((resolve, reject) => {
      let posts = {};
      let postOrder = {};
      for (let lang of i18nConfig.languages) {
        posts[lang] = {};
        postOrder[lang] = [];
      }

      graphql(queries.allShowcasePosts).then(res => {
        if (res.errors) return Promise.reject(res.errors);

        // Sort all posts into posts object and postOrder array
        Object.keys(res.data.allMarkdownRemark.edges).forEach(key => {
          let node = res.data.allMarkdownRemark.edges[key].node;
          let slug = path.basename(node.frontmatter.path);
          let language = node.frontmatter.path.split("/")[1];
          posts[language][slug] = node;
          postOrder[language].push(slug);
          createShowcasePostRedirect(slug);
        });

        // Create pages for showcase posts in all languages
        for (let lang of i18nConfig.languages) {
          for (slug of postOrder[i18nConfig.defaultLanguage]) {
            let contentLanguage;
            let postNode;
            let origNode = posts[lang][slug];
            if (typeof posts[lang][slug] === "undefined") {
              // Post not available in this language, use default language instead
              contentLanguage = i18nConfig.defaultLanguage;
              postNode = posts[i18nConfig.defaultLanguage][slug];
            } else {
              contentLanguage = lang;
              postNode = posts[lang][slug];
            }
            createShowcasePost(lang, contentLanguage, slug, postNode);
          }
          createShowcaseIndex(lang, posts);
        }
      });
      return resolve();
    });
  };

  createDocumentation = function() {
    return new Promise((resolve, reject) => {
      let pages = {};
      for (let lang of i18nConfig.languages) pages[lang] = {};

      graphql(queries.allDocumentation).then(res => {
        if (res.errors) return Promise.reject(res.errors);

        // Sort all pages into pages object
        Object.keys(res.data.allMarkdownRemark.edges).forEach(key => {
          let node = res.data.allMarkdownRemark.edges[key].node;
          let language = node.frontmatter.path.split("/")[1];
          let slug = node.frontmatter.path.substr(language.length + 1);
          pages[language][slug] = node;
          createDocumentationRedirect(slug);
        });
        // Create documentation pages all languages
        for (let lang of i18nConfig.languages) {
          Object.keys(pages[i18nConfig.defaultLanguage]).forEach(slug => {
            let contentLanguage;
            let pageNode;
            let origNode = pages[lang][slug];
            if (typeof pages[lang][slug] === "undefined") {
              // Page not available in this language, use default language instead
              contentLanguage = i18nConfig.defaultLanguage;
              pageNode = pages[i18nConfig.defaultLanguage][slug];
            } else {
              contentLanguage = lang;
              pageNode = pages[lang][slug];
            }
            createDocumentationPage(lang, contentLanguage, slug, pageNode);
          });
          // FIXME: Create documentation indexes
          //createShowcaseIndex(lang, pages);
        }
      });
      return resolve();
    });
  };

  createJsPages = function() {
    return new Promise((resolve, reject) => {
      // Create JS pages all languages
      for (let lang of i18nConfig.languages) {
        for (let jsPage of jsPages)
          createJsPage(
            lang,
            jsPage.slug,
            jsPage.template,
            jsPage.match,
            jsPage.query
          );
      }
      return resolve();
    });
  };

  return new Promise((resolve, reject) => {
    createPageRedirects()
      .then(() => {
        createBlogPosts();
      })
      .then(() => {
        createShowcasePosts();
      })
      .then(() => {
        createDocumentation();
      })
      .then(() => {
        createJsPages();
      })
      .then(() => {
        // FIXME: This hack has to go
        setTimeout(function() {
          resolve();
        }, 30000);
      });
  });
};

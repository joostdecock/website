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
  const naked = ["/", "/blog", "/showcase"];

  createBlogPostRedirect = function(slug) {
    /*
    console.log(
      "Creating redirect from",
      "/blog/" + slug,
      "to",
      "/" + i18nConfig.defaultLanguage + "/blog/" + slug
    );
    */
    createRedirect({
      fromPath: "/blog/" + slug,
      isPermanent: true,
      redirectInBrowser: true,
      toPath: "/" + i18nConfig.defaultLanguage + "/blog/" + slug
    });
  };

  createShowcasePostRedirect = function(slug) {
    /*
    console.log(
      "Creating redirect from",
      "/showcase/" + slug,
      "to",
      "/" + i18nConfig.defaultLanguage + "/showcase/" + slug
    );
    */
    createRedirect({
      fromPath: "/showcase/" + slug,
      isPermanent: true,
      redirectInBrowser: true,
      toPath: "/" + i18nConfig.defaultLanguage + "/showcase/" + slug
    });
  };

  createDocumentationRedirect = function(slug) {
    /*
    console.log(
      "Creating redirect from",
      slug,
      "to",
      "/" + i18nConfig.defaultLanguage + slug
    );
    */
    createRedirect({
      fromPath: slug,
      isPermanent: true,
      redirectInBrowser: true,
      toPath: "/" + i18nConfig.defaultLanguage + slug
    });
  };

  createBlogIndex = function(language, posts) {
    /*
    console.log("Creating blog index page for", language);
    */
    createPage({
      path: `/${language}/blog`,
      component: blogIndexTemplate,
      context: {
        posts,
        language,
        slug: `/${language}/blog`,
        category: "all"
      }
    });
  };

  createBlogCategoryIndex = function(language, posts, category) {
    /*
    console.log("Creating blog categories for", language);
    */
    createPage({
      path: `/${language}/blog/category/${category}`,
      component: blogIndexTemplate,
      context: {
        posts,
        language,
        slug: `/${language}/blog/category/${category}`,
        category: category
      }
    });
  };

  createShowcaseIndex = function(language, posts) {
    /*
    console.log("Creating showcase index page for", language);
    */
    createPage({
      path: `/${language}/showcase`,
      component: showcaseIndexTemplate,
      context: {
        posts,
        language,
        slug: `/${language}/showcase`
      }
    });
  };

  createBlogPost = function(language, contentLanguage, slug, node) {
    /*
    console.log("Creating blog post", `/${language}/blog/${slug}`);
    */
    createPage({
      path: `/${language}/blog/${slug}`,
      component: blogPostTemplate,
      context: {
        node,
        contentLanguage,
        language,
        slug: `/${language}/blog/${slug}`
      }
    });
  };

  createShowcasePost = function(language, contentLanguage, slug, node) {
    /*
    console.log("Creating showcase post", `/${language}/showcase/${slug}`);
    */
    createPage({
      path: `/${language}/showcase/${slug}`,
      component: showcasePostTemplate,
      context: {
        node,
        contentLanguage,
        language,
        slug: `/${language}/showcase/${slug}`
      }
    });
  };

  createDocumentationPage = function(language, contentLanguage, slug, node) {
    /*
    console.log("Creating documentation page", `/${language}${slug}`);
    */
    createPage({
      path: `/${language}${slug}`,
      component: documentationTemplate,
      context: {
        node,
        contentLanguage,
        language,
        slug: `/${language}${slug}`
      }
    });
  };

  createPageRedirects = function() {
    return new Promise((resolve, reject) => {
      for (nakedPath of naked) {
        /*
        console.log(
          "Creating redirect from",
          nakedPath,
          "to",
          "/" + i18nConfig.defaultLanguage + nakedPath
        );
        */
        createRedirect({
          fromPath: nakedPath,
          isPermanent: true,
          redirectInBrowser: true,
          toPath: "/" + i18nConfig.defaultLanguage + nakedPath
        });
      }
      /*
      console.log('Page redirects created');
      */
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
        if (res.errors) return Promise.reject(res.erros);

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
      /*
      console.log('Blogposts created');
      */
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
        if (res.errors) return Promise.reject(res.erros);

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
      /*
      console.log('Showcases created');
      */
      return resolve();
    });
  };

  createDocumentation = function() {
    return new Promise((resolve, reject) => {
      let pages = {};
      for (let lang of i18nConfig.languages) pages[lang] = {};

      graphql(queries.allDocumentation).then(res => {
        if (res.errors) return Promise.reject(res.erros);

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
      /*
      console.log('Documentation created');
      */
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
        // FIXME: This hack has to go
        setTimeout(function() {
          resolve();
        }, 30000);
      });
  });
};

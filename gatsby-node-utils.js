const config = require("./gatsby-node-config");
const path = require("path");
const fs = require("fs");
const i18nConfig = require("./src/config/i18n");

const markdownPerLanguage = function(data, addMissing = true) {
  if (
    typeof data === "undefined" ||
    typeof data.allMarkdownRemark === "undefined" ||
    data.allMarkdownRemark === null
  )
    return data; // Not markdown but other query
  let dflt = config.defaultLanguage;
  let edges = data.allMarkdownRemark.edges;
  const markdown = {};
  markdown[dflt] = {};
  Object.keys(edges).forEach(key => {
    let node = edges[key].node;
    let path = node.frontmatter.path;
    let lang = langFromPath(path);
    node.language = lang;
    if (typeof markdown[lang] === "undefined") markdown[lang] = {};
    markdown[lang][pathWithoutLang(path)] = node;
  });
  for (let lang of config.languages) {
    if (typeof markdown[lang] === "undefined") markdown[lang] = {};
    if (lang !== dflt && addMissing) {
      Object.keys(markdown[dflt]).forEach(key => {
        if (typeof markdown[lang][key] === "undefined") {
          markdown[lang][key] = markdown[dflt][key];
        }
      });
    }
  }

  return markdown;
};

const langFromPath = function(path) {
  let lang = path.split("/")[1];
  if (config.languages.indexOf(lang) !== -1) return lang;
  else return config.defaultLanguage;
};

const pathWithoutLang = function(path) {
  let chunks = path.split("/");
  if (config.languages.indexOf(chunks[1]) !== -1)
    return path.substr(chunks[1].length + 1);
  return path;
};

const documentationBreadcrumbs = function(nakedPath, language, pages) {
  let crumbs = [];
  let root = "/docs";
  let parent = parentPath(nakedPath);
  while (parent.length > root.length) {
    crumbs.push({ link: parent, label: crumbLabel(parent, language, pages) });
    parent = parentPath(parent);
  }

  return crumbs.reverse();
};

const crumbLabel = function(nakedPath, lang, pages) {
  if (typeof pages[lang][nakedPath] !== "undefined") {
    return pages[lang][nakedPath].frontmatter.title;
  } else if (typeof pages[config.defaultLanguage][nakedPath] !== "undefined") {
    return pages[config.defaultLanguage][nakedPath].frontmatter.title;
  } else return nakedPath.split("/").pop();
};

const parentPath = function(nakedPath) {
  let len = nakedPath.trim().length;
  if (nakedPath.trim().substring(len - 1, len) === "/")
    nakedPath = nakedPath.substring(0, len - 1);

  return nakedPath
    .split("/")
    .slice(0, -1)
    .join("/");
};

exports.runQueries = function(queries, graphql, markdown) {
  let promises = [];
  for (let query of Object.keys(queries)) {
    promises.push(
      new Promise((resolve, reject) => {
        graphql(queries[query]).then(res => {
          if (typeof res.data === "undefined")
            console.log("query failed", query, res);
          else {
            // No language stuffing for CMS data
            if (query.substring(0, 3) === "cms")
              markdown[query] = markdownPerLanguage(res.data, false);
            else markdown[query] = markdownPerLanguage(res.data);
          }
          resolve(true);
        });
      })
    );
  }
  return Promise.all(promises);
};

exports.createPageRedirects = function(nakedPaths, createRedirect) {
  let promises = [];
  for (nakedPath of nakedPaths) {
    createRedirect({
      fromPath: nakedPath,
      isPermanent: true,
      redirectInBrowser: true,
      toPath: "/" + config.defaultLanguage + nakedPath
    });
  }
  return Promise.all(promises);
};

exports.createPosts = function(type, posts, createPage, createRedirect) {
  let promises = [];
  let categories = new Set();
  let categoryPosts = {};

  // Create pages for posts in all languages
  for (let lang of config.languages) {
    categoryPosts[lang] = {};
    for (nakedPath of Object.keys(posts[lang])) {
      let post = posts[lang][nakedPath];
      let cats = [];
      if (type === "blog") cats.push(post.frontmatter.category);
      else cats = post.frontmatter.patterns;
      for (let cat of cats) {
        categories.add(cat);
        if (typeof categoryPosts[lang][cat] === "undefined")
          categoryPosts[lang][cat] = {};
        categoryPosts[lang][cat][nakedPath] = post;
      }
      createPage({
        path: `/${lang}${nakedPath}`,
        component: config.templates[type + "Post"],
        context: {
          post,
          language: lang,
          location: `/${lang}${nakedPath}`
        }
      });
      if (lang === config.defaultLanguage) {
        // Redirects for legacy links without language prefix
        createRedirect({
          fromPath: nakedPath,
          isPermanent: true,
          redirectInBrowser: true,
          toPath: "/" + config.defaultLanguage + nakedPath
        });
      }
    }
    // Category indexes
    categories.forEach(category => {
      createPage({
        path: `/${lang}/${type}/category/${category}`,
        component: config.templates[type + "Index"],
        context: {
          posts: categoryPosts[lang][category],
          language: lang,
          location: `/${lang}/${type}/category/${category}`,
          category: category
        }
      });
    });
    // Main index
    createPage({
      path: `/${lang}/${type}`,
      component: config.templates[type + "Index"],
      context: {
        posts: posts[lang],
        language: lang,
        location: `/${lang}/${type}`,
        category: "all"
      }
    });
  }
  return Promise.all(promises);
};

exports.createDocumentation = function(pages, createPage, createRedirect) {
  let promises = [];
  let prefix = {
    measurements: "/docs/measurements/"
  };
  // Create pages for documentation in all languages
  for (let lang of config.languages) {
    for (nakedPath of Object.keys(pages[lang])) {
      let page = pages[lang][nakedPath];
      if (
        nakedPath.substring(0, prefix.measurements.length) ===
        prefix.measurements
      )
        page.frontmatter.measurement = nakedPath.split("/").pop();
      // Add breadcrumbs to frontmatter
      page.frontmatter.breadcrumbs = documentationBreadcrumbs(
        nakedPath,
        lang,
        pages
      );
      // Create page
      createPage({
        path: `/${lang}${nakedPath}`,
        component: config.templates.documentation,
        context: {
          page,
          language: lang,
          location: `/${lang}/${nakedPath}`
        }
      });
    }
  }
  return Promise.all(promises);
};

exports.createJsPages = function(markdown, createPage, createRedirect) {
  let promises = [];
  for (let lang of config.languages) {
    for (let page of config.jsPages) {
      let {
        nakedPath,
        template,
        match = false,
        includeMarkdown = false,
        includeAllLanguages = false,
        limit = false,
        includeQuery = false
      } = page;
      let pageData = {
        path: `/${lang}${nakedPath}`,
        component: template,
        context: {
          language: lang,
          location: `/${lang}${nakedPath}`,
          ...page.extraProps
        }
      };
      if (match) pageData.matchPath = "/" + lang + match;
      if (includeMarkdown !== false) {
        if (typeof includeMarkdown === "string")
          includeMarkdown = [includeMarkdown];
        pageData.context.data = {};
        for (let includeMd of includeMarkdown) {
          if (includeAllLanguages)
            pageData.context.data[includeMd] = markdown[includeMd];
          else pageData.context.data[includeMd] = markdown[includeMd][lang];
          if (limit) {
            includes = {};
            for (let md of Object.keys(pageData.context.data[includeMd]).slice(
              0,
              limit
            )) {
              includes[md] = pageData.context.data[includeMd][md];
            }
            pageData.context.data[includeMd] = includes;
          }
        }
      }
      if (includeQuery !== false) {
        if (typeof includeQuery === "string") includeQuery = [includeQuery];
        pageData.context.data = {};
        for (let includeQ of includeQuery) {
          pageData.context.data[includeQ] = markdown[includeQ];
        }
      }
      createPage(pageData);
    }
  }
  return Promise.all(promises);
};

const splitDocs = markdown => {
  // The docs collection is too large, so let's divide it
  let split = {};
  let pattern;
  for (let lang of Object.keys(markdown)) {
    if (typeof split[lang] === "undefined") split[lang] = {};
    for (let key of Object.keys(markdown[lang])) {
      if (key.substring(0, 15) === "/docs/patterns/") {
        pattern = key
          .substring(15)
          .split("/")
          .shift();
        if (typeof split[lang][pattern] === "undefined")
          split[lang][pattern] = {};
        split[lang][pattern][key] = markdown[lang][key];
      } else if (key.substring(0, 19) === "/docs/measurements/") {
        if (typeof split[lang].measurements === "undefined")
          split[lang].measurements = {};
        split[lang].measurements[key] = markdown[lang][key];
      } else {
        if (typeof split[lang].other === "undefined") split[lang].other = {};
        split[lang].other[key] = markdown[lang][key];
      }
    }
  }

  return split;
};

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

exports.createEditorConfig = function(allMarkdown) {
  let promises = [];
  let markdown = {
    blog: allMarkdown.cmsBlogPosts,
    showcase: allMarkdown.cmsShowcasePosts,
    docs: splitDocs(allMarkdown.cmsDocumentation)
  };

  let config = {
    backend: {
      name: "github",
      repo: "freesewing/website",
      branch: "editor"
    },
    media_folder: "static/assets",
    public_folder: "/static/assets",
    display_url: process.env.GATSBY_FRONTEND,
    collections: []
  };

  const blogFields = [
    { label: "Title", name: "title", widget: "string" },
    { label: "Link title", name: "linktitle", widget: "string" },
    { label: "Author", name: "author", widget: "string" },
    { label: "Blurb", name: "blurb", widget: "string" },
    { label: "Caption", name: "caption", widget: "string" },
    { label: "Image", name: "img", widget: "string" },
    { label: "Path", name: "path", widget: "string" },
    { label: "Date", name: "date", widget: "date" },
    { label: "Body", name: "body", widget: "markdown" }
  ];
  const showcaseFields = [
    { label: "Title", name: "title", widget: "string" },
    { label: "Author", name: "author", widget: "string" },
    { label: "Caption", name: "caption", widget: "string" },
    { label: "Image", name: "img", widget: "string" },
    { label: "Path", name: "path", widget: "string" },
    { label: "Date", name: "date", widget: "date" },
    { label: "Body", name: "body", widget: "markdown" }
  ];

  const docsFields = [
    { label: "Title", name: "title", widget: "string" },
    { label: "Path", name: "path", widget: "string" },
    { label: "Body", name: "body", widget: "markdown" }
  ];

  for (let lang of i18nConfig.languages) {
    // Blog posts
    let collection = {
      name: "blog_" + lang,
      label: "Blog posts - " + i18nConfig.translations[lang],
      files: []
    };
    for (let key of Object.keys(markdown.blog[lang])) {
      let post = markdown.blog[lang][key];
      collection.files.push({
        name: key.replace(/\//g, "_"),
        label: post.frontmatter.title + " [" + key + "]",
        file:
          "src/markdown/" +
          post.frontmatter.img.relativeDirectory +
          "/" +
          lang +
          ".md",
        fields: blogFields
      });
    }
    config.collections.push(collection);
    // Showcase posts
    collection = {
      name: "showcase_" + lang,
      label: "Showcase posts - " + i18nConfig.translations[lang],
      files: []
    };
    for (let key of Object.keys(markdown.showcase[lang])) {
      let post = markdown.showcase[lang][key];
      collection.files.push({
        name: key.replace(/\//g, "_"),
        label: post.frontmatter.title + " [" + key + "]",
        file:
          "src/markdown/" +
          post.frontmatter.img.relativeDirectory +
          "/" +
          lang +
          ".md",
        fields: showcaseFields
      });
    }
    config.collections.push(collection);
    // Docs
    for (let topic of Object.keys(markdown.docs[lang])) {
      collection = {
        name: "docs_" + topic + "_" + lang,
        label:
          capitalize(topic) +
          " documentation - " +
          i18nConfig.translations[lang],
        files: []
      };
      for (let key of Object.keys(markdown.docs[lang][topic])) {
        let page = markdown.docs[lang][topic][key];
        collection.files.push({
          name: key.replace(/\//g, "_"),
          label: page.frontmatter.title + " [" + key + "]",
          file: "src/markdown" + key + "/" + lang + ".md",
          fields: docsFields
        });
      }
      config.collections.push(collection);
    }
  }

  fs.writeFileSync(
    path.join(".", "static", "editor.json"),
    JSON.stringify({ config }, null, 2)
  );

  return Promise.all(promises);
};

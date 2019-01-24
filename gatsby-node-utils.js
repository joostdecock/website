const config = require("./gatsby-node-config");
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

exports.runQueries = function(queries, graphql, markdown, editor) {
  let promises = [];
  for (let query of Object.keys(queries)) {
    promises.push(
      new Promise((resolve, reject) => {
        graphql(queries[query]).then(res => {
          if (typeof res.data === "undefined")
            console.log("query failed", query, res);
          else {
            markdown[query] = markdownPerLanguage(res.data);
            // Copy without language stuffing for editor
            if (editor.indexOf(query) !== -1)
              markdown["editor_" + query] = markdownPerLanguage(
                res.data,
                false
              );
          }
          resolve(true);
        });
      })
    );
  }
  return Promise.all(promises);
};

exports.createHomepageRedirect = function(createRedirect) {
  // Our redirects are handled by Netlify, but not having the
  // homepage work would be a pain when developing locally.
  return createRedirect({
    fromPath: "/",
    isPermanent: true,
    redirectInBrowser: true,
    toPath: "/" + config.defaultLanguage
  });
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

exports.createNetlifyRedirects = function(queries) {
  return new Promise((resolve, reject) => {
    let redirects = [];

    redirects.push("# Editor image rewrites");
    for (let lang of config.languages) {
      redirects.push("\n# For " + lang);
      for (let img of queries.markdownImages.allFile.edges)
        redirects.push(
          "/" +
            lang +
            "/edit/" +
            img.node.relativePath +
            " " +
            img.node.publicURL +
            " 200"
        );
    }

    for (let lang of config.languages) {
      if (lang !== config.defaultLanguage) {
        redirects.push("\n# Language-specific redirects for " + lang);
        for (let path of config.nakedPaths)
          redirects.push(path + " /" + lang + path + " 302 Language=" + lang);
      }
    }

    redirects.push("\n# Language-specific redirects for en");
    for (let path of config.nakedPaths)
      redirects.push(path + " /" + config.defaultLanguage + path + " 302");

    redirects.push("\n\n# Catch-all SPA rewrite");
    redirects.push("/* /en/index.html 200");

    // Write to _redirects file
    fs.writeFile("./static/_redirects", redirects.join("\n"), function(
      err,
      data
    ) {
      if (err) console.log("Could not write Netlify redirects file", err);
      resolve(true);
    });
  });
};

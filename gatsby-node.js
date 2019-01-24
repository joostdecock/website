const config = require("./gatsby-node-config");
const utils = require("./gatsby-node-utils");
const queries = require("./gatsby-node-queries");

exports.createPages = ({ actions, graphql }) => {
  return new Promise((resolve, reject) => {
    const markdown = {};
    utils
      .runQueries(queries, graphql, markdown, config.editor)
      .then(() => {
        console.log();
        console.log("[#------]", "GraphQl queries complete");
        utils.createHomepageRedirect(actions.createRedirect);
      })
      .then(() => {
        console.log("[##-----]", "Homepage redirect created");
        utils.createPosts(
          "blog",
          markdown.allBlogPosts,
          actions.createPage,
          actions.createRedirect
        );
      })
      .then(() => {
        console.log("[###----]", "Blog posts and indexes created");
        utils.createPosts(
          "showcase",
          markdown.allShowcasePosts,
          actions.createPage,
          actions.createRedirect
        );
      })
      .then(() => {
        console.log("[####---]", "Showcase posts and indexes created");
        utils.createDocumentation(
          markdown.allDocumentation,
          actions.createPage,
          actions.createRedirect
        );
      })
      .then(() => {
        console.log("[#####--]", "Documentation pages created");
        utils.createJsPages(
          markdown,
          actions.createPage,
          actions.createRedirect
        );
      })
      .then(() => {
        console.log("[######-]", "Application endpoints created");
        utils.createNetlifyRedirects(markdown);
      })
      .then(() => {
        console.log("[#######]", "Netlify redirects written to file");
        resolve(true);
      });
  });
};

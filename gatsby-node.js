const config = require("./gatsby-node-config");
const utils = require("./gatsby-node-utils");
const queries = require("./gatsby-node-queries");

exports.createPages = ({ actions, graphql }) => {
  const markdown = {};
  let promises = [];
  utils.runQueries(queries, graphql, markdown).then(() => {
    promises.push(
      utils.createPageRedirects(config.nakedPaths, actions.createRedirect)
    );
    promises.push(
      utils.createPosts(
        "blog",
        markdown.allBlogPosts,
        actions.createPage,
        actions.createRedirect
      )
    );
    promises.push(
      utils.createPosts(
        "showcase",
        markdown.allShowcasePosts,
        actions.createPage,
        actions.createRedirect
      )
    );
    promises.push(
      utils.createDocumentation(
        markdown.allDocumentation,
        actions.createPage,
        actions.createRedirect
      )
    );
    promises.push(
      utils.createJsPages(markdown, actions.createPage, actions.createRedirect)
    );
  });

  return Promise.all(promises);
};

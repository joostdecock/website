const i18nConfig = require("./src/config/i18n.js");

const search = {};
const queries = [];

const transformer = ({ data }) => {
  return data.allMarkdownRemark.edges.map(({ node }) => {
    node.objectID = node.frontmatter.path;
    return node;
  });
};

for (let lang of i18nConfig.languages) {
  search[lang] = `{
  	allMarkdownRemark(
      filter: {
        frontmatter: {
        	path: { regex: "/\/${lang}\/"}
        }
      }) {
      edges {
        node {
          frontmatter{
          	title
            path
          }
        rawMarkdownBody
        }
      }
    }
  }`;
  queries.push({
    query: search[lang],
    indexName: lang + "_freesewing",
    transformer
  });
}

module.exports = queries;

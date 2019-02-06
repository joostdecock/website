import React from "react";
import BaseLayout from "../layouts/Base";
import Breadcrumbs from "../Breadcrumbs";
import { FormattedMessage } from "react-intl";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Snippet
} from "react-instantsearch-dom";
import algoliaConf from "../../config/algolia";
import { Link } from "gatsby";
import TwoColumns from "../TwoColumns";
import Column from "../Column";
import Tray from "../Tray";
import algologo from "../../assets/images/logos/algolia.svg";
import Button from "@material-ui/core/Button";

const Hit = ({ hit }) => (
  <div className="result">
    <h6>
      <Link to={hit.frontmatter.path}>
        <Highlight attribute="frontmatter.title" hit={hit} />
      </Link>
    </h6>
    <div className="hit-path">
      <Link to={hit.frontmatter.path}>
        <Highlight attribute="frontmatter.path" hit={hit} />
      </Link>
    </div>
    <div className="hit-snippet">
      <Snippet attribute="rawMarkdownBody" hit={hit} />
    </div>
  </div>
);

const Search = props => {
  const searchClient = algoliasearch(algoliaConf.appId, algoliaConf.apiKey);
  const index = props.pageContext.language + "_freesewing";
  return (
    <BaseLayout>
      <Breadcrumbs>
        <FormattedMessage id="app.search" />
      </Breadcrumbs>
      <h1>
        <FormattedMessage id="app.search" />
      </h1>
      <TwoColumns>
        <Column wide>
          <div className="search">
            <InstantSearch searchClient={searchClient} indexName={index}>
              <div className="searchbox">
                <SearchBox />
              </div>
              <div className="results">
                <Hits hitComponent={Hit} />
              </div>
            </InstantSearch>
          </div>
        </Column>
        <Column narrow right>
          <a href="https://algolia.com/">
            Search by&nbsp;
            <img
              src={algologo}
              alt="Search by Algolia"
              style={{ maxWidth: "100px", marginBottom: "-0.25rem" }}
            />
          </a>
          {props.pageContext.language === "en" ? null : (
            <Tray
              title={<FormattedMessage id="app.searchLanguageTitle" />}
              className="mt2"
              footer={
                <Link to="/en/search">
                  <Button>English Search</Button>
                </Link>
              }
            >
              <p>
                <FormattedMessage id="app.searchLanguageMsg" />
              </p>
            </Tray>
          )}
        </Column>
      </TwoColumns>
    </BaseLayout>
  );
};

export default Search;

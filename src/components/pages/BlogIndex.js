import React from "react";
import PropTypes from "prop-types";
import PageLayout from "../layouts/Page";
import BlogPostPreview from "../BlogPostPreview";
import Grid from "@material-ui/core/Grid";
import Warning from "../Warning";
import Translate from "@material-ui/icons/Translate";
import { FormattedMessage } from "react-intl";

export default class BlogIndex extends React.Component {
  render() {
    let post;
    let correctLanguage;
    let posts = this.props.pageContext.posts;
    let language = this.props.pageContext.language;
    let list = [];
    let slugs = Object.keys(posts.en).reverse();
    let missingPosts = false;
    for (let postSlug of slugs) {
      if (typeof posts[language][postSlug] !== "undefined") {
        post = posts[language][postSlug];
        correctLanguage = true;
      } else {
        post = posts.en[postSlug];
        correctLanguage = false;
        missingPosts = true;
      }
      list.push(
        <Grid item xs={12} sm={6}>
          <BlogPostPreview post={post} correctLanguage={correctLanguage} />
        </Grid>
      );
    }
    return (
      <PageLayout slug={this.props.pageContext.slug}>
        <Grid item xs={12} sm={12} md={10} lg={8} xl={8} className={"wmax"}>
          <h1 className="txt-center">Blog</h1>
          <Warning show={missingPosts}>
            <Translate />
            <h3>
              <FormattedMessage id="app.notAllOfThisContentIsAvailableInLanguage" />
            </h3>
            <ul>
              <li>
                <FormattedMessage id="app.colourYes" />
              </li>
              <li>
                <FormattedMessage id="app.monochromeNo" />
              </li>
            </ul>
          </Warning>
          <Grid container spacing={24}>
            {list}
          </Grid>
        </Grid>
      </PageLayout>
    );
  }
}

BlogIndex.propTypes = {
  posts: PropTypes.array
};

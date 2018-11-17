import React from "react";
import PropTypes from "prop-types";
import BaseLayout from "../layouts/Base";
import ShowcasePostPreview from "../ShowcasePostPreview";
import Grid from "@material-ui/core/Grid";
import { FormattedMessage } from "react-intl";
import Breadcrumbs from "../Breadcrumbs";
import LanguageNotAlwaysAvailable from "../LanguageNotAlwaysAvailable";

export default class ShowcaseIndex extends React.Component {
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
        <Grid item xs={12} sm={6} lg={4} key={postSlug}>
          <ShowcasePostPreview post={post} correctLanguage={correctLanguage} />
        </Grid>
      );
    }
    return (
      <BaseLayout>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="start"
          className="page"
        >
          <Breadcrumbs>
            <FormattedMessage id="app.showcase" />
          </Breadcrumbs>
          <h1 className="hide">
            <FormattedMessage id="app.showcase" />
          </h1>
          {missingPosts ? <LanguageNotAlwaysAvailable /> : ""}
          <Grid container spacing={24} class="masonry w100">
            {list}
          </Grid>
        </Grid>
      </BaseLayout>
    );
  }
}

ShowcaseIndex.propTypes = {
  posts: PropTypes.array
};

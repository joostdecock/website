import React from "react";
import PropTypes from "prop-types";
import BaseLayout from "../layouts/Base";
import BlogPostPreview from "../BlogPostPreview";
import Grid from "@material-ui/core/Grid";
import { FormattedMessage } from "react-intl";
import Breadcrumbs from "../Breadcrumbs";
import LanguageNotAlwaysAvailable from "../LanguageNotAlwaysAvailable";

export default class BlogIndex extends React.Component {
  render() {
    let post;
    let correctLanguage;
    let posts = this.props.pageContext.posts;
    let language = this.props.pageContext.language;
    let list = [];
    let slugs = Object.keys(posts.en).reverse();
    let missingPosts = false;
    let category = this.props.pageContext.category;
    for (let postSlug of slugs) {
      if (typeof posts[language][postSlug] !== "undefined") {
        post = posts[language][postSlug];
        correctLanguage = true;
      } else {
        post = posts.en[postSlug];
        correctLanguage = false;
        missingPosts = true;
      }
      if (category === "all" || category === post.frontmatter.category) {
        list.push(
          <Grid item xs={12} sm={6} key={post.frontmatter.path}>
            <BlogPostPreview
              post={post}
              correctLanguage={correctLanguage}
              language={language}
            />
          </Grid>
        );
      }
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
            <FormattedMessage id="app.blog" />
          </Breadcrumbs>
          <h1 className="hide">
            <FormattedMessage id="app.blog" />
            {category === "all" ? "" : " #" + category}
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

BlogIndex.propTypes = {
  posts: PropTypes.array
};

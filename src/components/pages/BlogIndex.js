import React from "react";
import BaseLayout from "../layouts/Base";
import BlogPostPreview from "../BlogPostPreview";
import Grid from "@material-ui/core/Grid";
import { FormattedMessage } from "react-intl";
import Breadcrumbs from "../Breadcrumbs";
import LanguageNotAlwaysAvailable from "../LanguageNotAlwaysAvailable";
import { locLang } from "../../utils";

export default data => {
  const { language, posts, category } = data.pageContext;
  let missingPosts = false;
  let list = [];
  for (let path of Object.keys(posts).reverse()) {
    let post = posts[path];
    if (category === "all" || category === post.frontmatter.category) {
      if (language !== post.language) missingPosts = true;
      list.push(
        <Grid item xs={12} sm={6} key={post.frontmatter.path}>
          <BlogPostPreview
            post={post}
            correctLanguage={language === post.language ? true : false}
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
        {category === "all" ? (
          <Breadcrumbs>
            <FormattedMessage id="app.blog" />
          </Breadcrumbs>
        ) : (
          <Breadcrumbs
            via={[
              {
                label: <FormattedMessage id="app.blog" />,
                link: locLang.set("/blog", language)
              }
            ]}
          >
            {"#" + category}
          </Breadcrumbs>
        )}
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
};

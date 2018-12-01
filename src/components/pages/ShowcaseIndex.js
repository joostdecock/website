import React from "react";
import BaseLayout from "../layouts/Base";
import ShowcasePostPreview from "../ShowcasePostPreview";
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
    if (
      category === "all" ||
      post.frontmatter.patterns.indexOf(category) !== -1
    ) {
      if (language !== post.language) missingPosts = true;
      list.push(
        <Grid item xs={12} sm={6} lg={4} key={post.frontmatter.path}>
          <ShowcasePostPreview
            post={post}
            correctLanguage={language === post.language ? true : false}
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
            <FormattedMessage id="app.showcase" />
          </Breadcrumbs>
        ) : (
          <Breadcrumbs
            via={[
              {
                label: <FormattedMessage id="app.showcase" />,
                link: locLang.set("/showcase", language)
              }
            ]}
          >
            {"#" + category}
          </Breadcrumbs>
        )}
        <h1 className="hide">
          <FormattedMessage id="app.showcase" />
        </h1>
        {missingPosts ? <LanguageNotAlwaysAvailable /> : ""}
        <div className="masonry w100">{list}</div>
      </Grid>
    </BaseLayout>
  );
};

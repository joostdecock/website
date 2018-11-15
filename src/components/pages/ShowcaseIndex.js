import React from "react";
import PropTypes from "prop-types";
import BaseLayout from "../layouts/Base";
import ShowcasePostPreview from "../ShowcasePostPreview";
import Grid from "@material-ui/core/Grid";
import Translate from "@material-ui/icons/Translate";
import { FormattedMessage } from "react-intl";
import Breadcrumbs from "../Breadcrumbs";
import Tray from "../Tray";
import TrayTitle from "../TrayTitle";
import TrayFooter from "../TrayFooter";
import { Link } from "gatsby";
import { locLang } from "../../utils";
import Button from "@material-ui/core/Button";

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
          alignItems="center"
          className="page"
        >
          <Grid item xs={12} className={"w100"}>
            <Breadcrumbs>
              <FormattedMessage id="app.showcase" />
            </Breadcrumbs>
            <h1 className="hide">
              <FormattedMessage id="app.showcase" />
            </h1>
            {missingPosts ? (
              <Tray className="warning my1">
                <TrayTitle icon={<Translate />}>
                  <FormattedMessage id="app.notAllOfThisContentIsAvailableInLanguage" />
                </TrayTitle>
                <ul>
                  <li>
                    <FormattedMessage id="app.colourYes" />
                  </li>
                  <li>
                    <FormattedMessage id="app.monochromeNo" />
                  </li>
                </ul>
                <TrayFooter>
                  <Link to={locLang.set("/docs/i18n", language)}>
                    <Button>
                      <FormattedMessage id="app.helpUsTranslate" />
                    </Button>
                  </Link>
                </TrayFooter>
              </Tray>
            ) : (
              ""
            )}
            <Grid container spacing={24} class="masonry">
              {list}
            </Grid>
          </Grid>
        </Grid>
      </BaseLayout>
    );
  }
}

ShowcaseIndex.propTypes = {
  posts: PropTypes.array
};

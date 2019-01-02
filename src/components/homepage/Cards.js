import React from "react";
import { Link } from "gatsby";
import { locLang, capitalize } from "../../utils";
import { FormattedMessage } from "react-intl";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import patternsImage from "./patterns.jpg";
import showcasesImage from "./showcases.jpg";
import blogpostsImage from "./blogposts.jpg";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { patternList } from "@freesewing/patterns";

const Cards = props => (
  <Grid container spacing={40} direction="row" justify="flex-start" wrap="wrap">
    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
      <Card classes={{ root: "nobg card" }}>
        <CardMedia
          style={{ height: "240px" }}
          image={patternsImage}
          title="patterns"
        />
        <CardContent>
          <h2 className="light">
            <FormattedMessage id="app.patterns" />
          </h2>
          <ul className="inline">
            {patternList.map((pattern, index) => (
              <li>
                <Link to={locLang.set("/patterns/" + pattern, props.language)}>
                  {capitalize(pattern)}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardActions classes={{ root: "row-reverse" }}>
          <Button
            size="small"
            color="primary"
            href={locLang.set("/patterns", props.language)}
          >
            <FormattedMessage id="app.browsePatterns" />
          </Button>
        </CardActions>
      </Card>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
      <Card classes={{ root: "nobg card" }}>
        <CardMedia
          style={{ height: "240px" }}
          image={showcasesImage}
          title="showcases"
        />
        <CardContent>
          <h2 className="light">
            <FormattedMessage id="app.showcase" />
          </h2>
          <p>
            <FormattedMessage id="intro.txt-showcase" />
          </p>
        </CardContent>
        <CardActions classes={{ root: "row-reverse" }}>
          <Button
            size="small"
            color="primary"
            href={locLang.set("/showcase", props.language)}
          >
            <FormattedMessage id="app.browseShowcases" />
          </Button>
        </CardActions>
      </Card>
    </Grid>
    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
      <Card classes={{ root: "nobg card" }}>
        <CardMedia
          style={{ height: "240px" }}
          image={blogpostsImage}
          title="patterns"
        />
        <CardContent>
          <h2 className="light">
            <FormattedMessage id="app.blog" />
          </h2>
          <p>
            <FormattedMessage id="intro.txt-blog" />
          </p>
        </CardContent>
        <CardActions classes={{ root: "row-reverse" }}>
          <Button
            size="small"
            color="primary"
            href={locLang.set("/blog", props.language)}
          >
            <FormattedMessage id="app.browseBlogposts" />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
);

export default Cards;

import React from "react";
import BaseLayout from "../layouts/Base";
import Image from "gatsby-image";
import Slider from "react-slick";
import { Link } from "gatsby";
import { locLang } from "../../utils";
import Chip from "@material-ui/core/Chip";
import { FormattedMessage } from "react-intl";
import NextIcon from "@material-ui/icons/KeyboardArrowRight";
import PrevIcon from "@material-ui/icons/KeyboardArrowLeft";
import TimeAgo from "../TimeAgo";
import Intro from "../Intro";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tray from "../Tray";
import CodeIcon from "@material-ui/icons/Code";
import HelpIcon from "@material-ui/icons/Help";
import HeartIcon from "@material-ui/icons/Favorite";
import AtmIcon from "@material-ui/icons/LocalAtm";
import CommunityIcon from "@material-ui/icons/Public";
import GithubIcon from "../GithubIcon";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <NextIcon
      className={className}
      style={{ ...style, display: "block", color: "grey" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <PrevIcon
      className={className}
      style={{ ...style, display: "block", color: "grey" }}
      onClick={onClick}
    />
  );
}

const HomePage = props => {
  const { data, language } = props.pageContext;
  const showcases = data.showcasePreviews;
  const blogposts = data.blogpostPreviews;
  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true
  };
  return (
    <BaseLayout>
      <Intro />
      <div className="vspacer">&nbsp;</div>
      <div className="vspacer">&nbsp;</div>
      <Grid
        container
        spacing={24}
        direction="row"
        justify="flex-start"
        wrap="wrap"
      >
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h2 className="light">
            <FormattedMessage id="app.100PercentOpenSource" />
          </h2>
          <p>
            <FormattedMessage id="intro.txt-opensource" />
          </p>
          <Button variant="outlined" href="https://github.com/freesewing">
            <GithubIcon className="mr1" />
            <FormattedMessage id="app.freesewingOnGithub" />
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h2 className="light">
            <FormattedMessage id="app.100PercentCommunity" />
          </h2>
          <p>
            <FormattedMessage id="intro.txt-community" />
          </p>
          <Button
            variant="outlined"
            href={locLang.set("/docs/about", language)}
          >
            <HelpIcon className="mr1" />
            <FormattedMessage id="app.aboutFreesewing" />
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <h2 className="light">
            <FormattedMessage id="app.100PercentFree" />
          </h2>
          <p>
            <FormattedMessage id="intro.txt-patrons" />
          </p>
          <Button
            variant="outlined"
            href={locLang.set("/patrons/join", language)}
          >
            <HeartIcon className="mr1" />
            <FormattedMessage id="app.becomeAPatron" />
          </Button>
        </Grid>
      </Grid>
      <div className="vspacer">&nbsp;</div>
      <div className="vspacer">&nbsp;</div>
      <Slider {...settings}>
        {Object.keys(showcases).map((nakedPath, index) => {
          let showcase = showcases[nakedPath];
          let frontmatter = showcase.frontmatter;
          let img = frontmatter.img.childImageSharp.fixed;
          return (
            <div
              style={{ width: 20 + img.width }}
              className="txt-center"
              key={"showcase-" + index}
            >
              <Link
                to={locLang.set(frontmatter.path, props.pageContext.language)}
              >
                <Image
                  key={"showcase-" + index}
                  fixed={frontmatter.img.childImageSharp.fixed}
                  title={frontmatter.caption}
                  alt={frontmatter.caption}
                  backgroundColor={"#212121"}
                  className="slide"
                />
              </Link>
              {frontmatter.patterns.map((pattern, pindex) => {
                return (
                  <Link
                    to={locLang.set(
                      "/patterns/" + pattern,
                      props.pageContext.language
                    )}
                    key={"showcase-" + index + "-link-" + pindex}
                  >
                    <Chip
                      color="primary"
                      variant="outlined"
                      label={pattern}
                      clickable={true}
                      className="slick-chip"
                    />
                  </Link>
                );
              })}
            </div>
          );
        })}
        <div style={{ width: "240" }} className="txt-center slide slide-card">
          <Link to={locLang.set("/showcase", props.pageContext.language)}>
            <FormattedMessage id="app.browseAllShowcases" />
            <span className="fs-block-link" />
          </Link>
        </div>
      </Slider>
    </BaseLayout>
  );
};

export default HomePage;

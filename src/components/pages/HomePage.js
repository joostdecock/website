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
      <h2>
        <FormattedMessage id="intro.txt-different" />
      </h2>
      <Grid
        container
        spacing={24}
        direction="row"
        justify="flex-start"
        wrap="wrap"
      >
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <Tray
            title={<FormattedMessage id="app.100PercentOpenSource" />}
            icon={<CodeIcon />}
            footer={
              <Button href="https://github.com/freesewing">
                <GithubIcon className="mr1" />
                <FormattedMessage id="app.freesewingOnGithub" />
              </Button>
            }
          >
            <p>
              <FormattedMessage id="intro.txt-opensource" />
            </p>
          </Tray>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <Tray
            title={<FormattedMessage id="app.100PercentCommunity" />}
            icon={<CommunityIcon />}
            footer={
              <Button href={locLang.set("/docs/about", language)}>
                <HelpIcon className="mr1" />
                <FormattedMessage id="app.aboutFreesewing" />
              </Button>
            }
          >
            <p>
              <FormattedMessage id="intro.txt-community" />
            </p>
          </Tray>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <Tray
            title={<FormattedMessage id="app.100PercentFree" />}
            icon={<AtmIcon />}
            footer={
              <Button href={locLang.set("/patrons/join", language)}>
                <HeartIcon className="mr1" />
                <FormattedMessage id="app.becomeAPatron" />
              </Button>
            }
          >
            <p>
              <FormattedMessage id="intro.txt-patrons" />
            </p>
          </Tray>
        </Grid>
      </Grid>
      <h2>
        <FormattedMessage id="app.blog" />
      </h2>
      <Slider {...settings}>
        {Object.keys(blogposts).map((nakedPath, index) => {
          let blogpost = blogposts[nakedPath];
          let frontmatter = blogpost.frontmatter;
          let img = frontmatter.img.childImageSharp.fixed;
          return (
            <div
              style={{ width: 20 + img.width }}
              className="txt-center teaser"
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
                <div className="title">
                  <p className="thetitle">
                    {frontmatter.title}
                    <span className="meta">
                      {frontmatter.author} @ {frontmatter.category}
                      ,&nbsp;&nbsp;
                      <TimeAgo date={frontmatter.date} />
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
        <div style={{ width: "240" }} className="txt-center slide slide-card">
          <Link to={locLang.set("/showcase", props.pageContext.language)}>
            <FormattedMessage id="app.browseAllBlogposts" />
            <span className="fs-block-link" />
          </Link>
        </div>
      </Slider>
      <h2>
        <FormattedMessage id="app.showcase" />
      </h2>
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

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
  const { data } = props.pageContext;
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

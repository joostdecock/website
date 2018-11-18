import React from "react";
import BaseLayout from "../layouts/Base";
import Image from "gatsby-image";
import Slider from "react-slick";
import { Link } from "gatsby";
import { locLang } from "../../utils";
import Chip from "@material-ui/core/Chip";
import LinkIcon from "@material-ui/icons/Link";
import { FormattedMessage } from "react-intl";

const HomePage = props => {
  const showcases = props.pageContext.data.allMarkdownRemark.edges.slice(0, 10);
  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    initialSlide: 1
  };
  return (
    <BaseLayout>
      <h2>
        <FormattedMessage id="app.showcase" />
      </h2>
      <Slider {...settings}>
        {showcases.map((showcase, index) => {
          let frontmatter = showcase.node.frontmatter;
          let img = frontmatter.img.childImageSharp.fixed;
          return (
            <div style={{ width: 20 + img.width }} className="txt-center">
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
            <h3 className="px1">
              <FormattedMessage id="app.browseAllShowcases" />
            </h3>
            <span className="fs-block-link" />
          </Link>
        </div>
      </Slider>
    </BaseLayout>
  );
};

export default HomePage;

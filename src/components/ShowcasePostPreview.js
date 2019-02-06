import React from "react";
import PropTypes from "prop-types";
import Image from "gatsby-image";
import { Link } from "gatsby";
import { FormattedRelative } from "react-intl";

const ShowcasePostPreview = props => {
  let langClass = "";
  let frontmatter = props.post.frontmatter;
  let postLink = frontmatter.path;
  if (props.correctLanguage !== true) langClass = "grayscale";
  return (
    <div className={props.className}>
      <div className="teaser">
        <Link to={postLink} title={frontmatter.title}>
          {/* This makes the link cover the entire image */}
          <span className="fs-block-link" />
        </Link>
        <figure className={langClass}>
          <Image
            fluid={frontmatter.img.childImageSharp.fluid}
            title={frontmatter.caption}
            alt={frontmatter.caption}
            backgroundColor={"#212121"}
            className="shadow1 br4"
          />
        </figure>
        {props.noTitle ? (
          ""
        ) : (
          <div className="title">
            <p className="thetitle">
              {frontmatter.title}
              <span className="meta">
                <FormattedRelative value={frontmatter.date} /> by @
                {frontmatter.author}
                <br />
                {frontmatter.patterns.map(cat => (
                  <span className="ml05">{"#" + cat}</span>
                ))}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

ShowcasePostPreview.propTypes = {
  post: PropTypes.object,
  correctLangauge: PropTypes.string
};

export default ShowcasePostPreview;

import React from "react";
import PropTypes from "prop-types";
import Image from "gatsby-image";
import { Link } from "gatsby";

const ShowcasePostPreview = data => {
  let langClass = "";
  let frontmatter = data.post.frontmatter;
  let postLink = frontmatter.path;
  if (postLink.slice(-1) !== "/") postLink += "/";
  if (data.correctLanguage !== true) langClass = "grayscale";
  return (
    <div className={data.className}>
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
        {data.noTitle ? (
          ""
        ) : (
          <div className="title">
            <p className="thetitle">
              {frontmatter.title}
              <span className="meta">
                {frontmatter.date} by @{frontmatter.author} in #
                {frontmatter.category}
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

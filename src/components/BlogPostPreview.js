import React from "react";
import PropTypes from "prop-types";
import Image from "gatsby-image";
import TimeAgo from "./TimeAgo";
import { Link } from "gatsby";
import { locLang } from "../utils";

const BlogPostPreview = props => {
  let langClass = "";
  let frontmatter = props.post.frontmatter;
  let postLink = frontmatter.path;
  if (props.correctLanguage !== true) {
    langClass = "grayscale";
    postLink = locLang.set(frontmatter.path, props.language);
  }
  return (
    <div>
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
          />
        </figure>
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
      </div>
    </div>
  );
};

BlogPostPreview.propTypes = {
  post: PropTypes.object,
  langauge: PropTypes.string,
  correctLangauge: PropTypes.bool
};

export default BlogPostPreview;

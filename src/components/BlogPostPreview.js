import React from "react"
import PropTypes from "prop-types";
import Image from "gatsby-image"
import { Link } from "gatsby";

const BlogPostPreview = ( data ) => {
  let langClass = '';
  let frontmatter = data.post.frontmatter;
  if(data.correctLanguage !== true) langClass = 'grayscale';
  return <div>
    <div className="teaser">
      <Link to={frontmatter.path} title={frontmatter.title}>
        {/* This makes the link cover the entire image */}
        <span className="fs-block-link"></span>
      </Link>
      <figure className={langClass}>
        <Image
          fluid={frontmatter.img.childImageSharp.fluid}
          title={frontmatter.caption}
          alt={frontmatter.caption}
          backgroundColor={'#212121'}
        />
      </figure>
      <div className="title">
        <p className="thetitle">
          {frontmatter.title}
          <span className="meta">
            {frontmatter.date} by @{frontmatter.author} in #{frontmatter.category}
          </span>
        </p>
      </div>
    </div>
  </div>
};

BlogPostPreview.propTypes = {
  post: PropTypes.object,
  correctLangauge: PropTypes.string
};

export default BlogPostPreview;

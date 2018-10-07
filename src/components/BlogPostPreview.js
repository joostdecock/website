import React from "react"
import PropTypes from "prop-types";
import Image from "gatsby-image"
import { Link } from "gatsby";

const BlogPostPreview = ( data ) => {
  let frontmatter = data.post.frontmatter;
  if(typeof data.image === "undefined") {
    return <div>
        <Link to={frontmatter.path} title={frontmatter.title}>
          {frontmatter.title}
       </Link>
         <p>FIXME: Missing header image. This should not happen, please report this.</p>
      </div>
  } else {
    return <div>
      <div className="teaser">
        <Link to={frontmatter.path} title={frontmatter.title}><span className="fs-block-link"></span></Link>
        <figure>
          <Image
            fluid={data.image.childImageSharp.fluid}
            title={frontmatter.caption}
            alt={frontmatter.caption}
            backgroundColor={'#212121'}
          />
          <figcaption dangerouslySetInnerHTML={{__html: frontmatter.caption}} />
        </figure>
        <div className="title">
          <p className="thetitle">
            {frontmatter.title}
            <span className="meta">
            {frontmatter.date} by @{frontmatter.author}  in  #{frontmatter.category}</span>
          </p>
        </div>
      </div>
    </div>
  }
};

BlogPostPreview.propTypes = {
    post: PropTypes.object
};

export default BlogPostPreview;

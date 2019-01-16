import React from "react";
import PropTypes from "prop-types";
import Image from "gatsby-image";
import { Link } from "gatsby";
import { locLang } from "../utils";

const PatternPreview = props => {
  let { pattern, image, language, draftLink = false } = props;
  return (
    <div className="teaser">
      <Link
        to={locLang.set(
          (draftLink ? "/draft/" : "/patterns/") + pattern,
          language
        )}
        title={pattern}
      >
        {/* This makes the link cover the entire image */}
        <span className="fs-block-link" />
      </Link>
      <figure>
        <Image
          fluid={image.fluid}
          title={pattern}
          alt={pattern}
          backgroundColor={"#212121"}
          className="shadow1 mt1 br4"
        />
      </figure>
      <div className="title">
        <p className="thetitle">{pattern}</p>
      </div>
    </div>
  );
};

PatternPreview.propTypes = {
  langauge: PropTypes.string
};

export default PatternPreview;

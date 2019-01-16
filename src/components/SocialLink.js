import React from "react";
import PropTypes from "prop-types";

const SocialLink = ({ site, account }) =>
  account ? (
    <a
      target="_BLANK"
      href={"https://" + site + ".com/" + account}
      rel="noopener noreferrer"
    >
      {"@ " + account}
    </a>
  ) : (
    ""
  );

SocialLink.propTypes = {
  site: PropTypes.oneOf(["github", "twitter", "instagram"]).isRequired
};

export default SocialLink;

import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";
import { github } from "../config/icons";

const GithubIcon = props => {
  return (
    <Icon
      size={props.size}
      viewBox={props.viewBox}
      pathString={github}
      className={props.className}
    />
  );
};

GithubIcon.propTypes = {
  size: PropTypes.number,
  viewBox: PropTypes.string
};

GithubIcon.defaultProps = {
  size: 24,
  viewBox: "0 0 24 24"
};

export default GithubIcon;

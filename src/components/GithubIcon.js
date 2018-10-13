import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";
import { github } from "../data/icons";

const GithubIcon = props => {
  return (
    <Icon
      width={props.size}
      height={props.size}
      viewBox={props.viewBox}
      color={props.color}
      pathString={github}
    />
  );
};

GithubIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  viewBox: PropTypes.string
};

GithubIcon.defaultProps = {
  size: 24,
  color: "#00000080",
  viewBox: "0 0 24 24"
};

export default GithubIcon;

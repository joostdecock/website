import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";
import { width } from "../config/icons";

const WidthIcon = props => {
  return (
    <Icon
      size={props.size}
      viewBox={props.viewBox}
      pathString={width}
      className={props.className}
    />
  );
};

WidthIcon.propTypes = {
  size: PropTypes.number,
  viewBox: PropTypes.string
};

WidthIcon.defaultProps = {
  size: 24,
  viewBox: "0 0 24 24",
  className: ""
};

export default WidthIcon;

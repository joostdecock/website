import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";
import { piled } from "../data/icons";

const PiledIcon = props => {
  return (
    <Icon
      size={props.size}
      viewBox={props.viewBox}
      pathString={piled}
      className={props.className}
    />
  );
};

PiledIcon.propTypes = {
  size: PropTypes.number,
  viewBox: PropTypes.string
};

PiledIcon.defaultProps = {
  size: 24,
  viewBox: "0 0 24 24",
  className: ""
};

export default PiledIcon;

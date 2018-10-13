import React from "react";
import PropTypes from "prop-types";

const Icon = props => {
  let classes = "icon";
  if (props.color === "") classes += " css-fill";
  return (
    <svg
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox={props.viewBox}
    >
      <path stroke="none" fill={props.color} d={props.path} />
    </svg>
  );
};

Icon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  viewBox: PropTypes.string,
  path: PropTypes.string.Required
};

Icon.defaultProps = {
  size: 24,
  color: "#00000080",
  viewBox: "0 0 24 24"
};

export default Icon;

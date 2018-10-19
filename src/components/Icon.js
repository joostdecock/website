import React from "react";
import PropTypes from "prop-types";

const Icon = props => {
  let classes = "icon";
  return (
    <svg
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox={props.viewBox}
    >
      <path stroke="none" fill="currentColor" d={props.pathString} />
    </svg>
  );
};

Icon.propTypes = {
  size: PropTypes.number,
  viewBox: PropTypes.string,
  pathString: PropTypes.string.isRequired
};

Icon.defaultProps = {
  size: 24,
  viewBox: "0 0 24 24"
};

export default Icon;

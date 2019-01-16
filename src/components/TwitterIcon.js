import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";
import { twitter } from "../data/icons";

const TwitterIcon = props => {
  return (
    <Icon
      size={props.size}
      viewBox={props.viewBox}
      pathString={twitter}
      className={props.className}
    />
  );
};

TwitterIcon.propTypes = {
  size: PropTypes.number,
  viewBox: PropTypes.string
};

TwitterIcon.defaultProps = {
  size: 24,
  viewBox: "0 0 24 24",
  className: ""
};

export default TwitterIcon;

import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";
import { instagram } from "../data/icons";

const InstagramIcon = props => {
  return (
    <Icon
      size={props.size}
      viewBox={props.viewBox}
      pathString={instagram}
      className={props.className}
    />
  );
};

InstagramIcon.propTypes = {
  size: PropTypes.number,
  viewBox: PropTypes.string
};

InstagramIcon.defaultProps = {
  size: 24,
  viewBox: "0 0 24 24"
};

export default InstagramIcon;

import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";
import { google } from "../config/icons";

const GoogleIcon = props => {
  return (
    <Icon
      size={props.size}
      viewBox={props.viewBox}
      pathString={google}
      className={props.className}
    />
  );
};

GoogleIcon.propTypes = {
  size: PropTypes.number,
  viewBox: PropTypes.string
};

GoogleIcon.defaultProps = {
  size: 24,
  viewBox: "0 0 24 24",
  className: ""
};

export default GoogleIcon;

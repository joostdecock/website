import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";
import { instagram } from "../data/icons";

const InstagramIcon = props => {
  return (
    <Icon
      width={props.size}
      height={props.size}
      viewBox={props.viewBox}
      color={props.color}
      pathString={instagram}
    />
  );
};

InstagramIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  viewBox: PropTypes.string
};

InstagramIcon.defaultProps = {
  size: 24,
  color: "#00000080",
  viewBox: "0 0 24 24"
};

export default InstagramIcon;

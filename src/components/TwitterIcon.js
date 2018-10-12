import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";
import { twitter } from "../data/icons";

const TwitterIcon = props => {
  return (
    <Icon
      width={props.size}
      height={props.size}
      viewBox={props.viewBox}
      color={props.color}
      path={twitter}
    />
  );
};

TwitterIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  viewBox: PropTypes.string
};

TwitterIcon.defaultProps = {
  size: 24,
  color: "#00000080",
  viewBox: "0 0 24 24"
};

export default TwitterIcon;

import React from "react";
import PropTypes from "prop-types";

const Message = props => {
  if (props.show === false) return "";
  else return <div className={"message " + props.type}>{props.children}</div>;
};

Message.propTypes = {
  show: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

Message.defaultProps = {
  show: true
};

export default Message;

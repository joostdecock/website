import React from 'react';
import PropTypes from "prop-types";

const Warning = ( props ) => {
  if(props.show === false) return '';
  else return <div className={props.type}>{props.children}</div>
}

Warning.propTypes = {
  show: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

Warning.defaultProps = {
  show: true,
  type: 'warning'
}

export default Warning;

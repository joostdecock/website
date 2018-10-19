import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

const ButtonSpinner = props => {
  return props.loading ? (
    <CircularProgress
      color="inherit"
      size={25}
      thickness={6}
      className="btn-spinner"
    />
  ) : (
    props.icon
  );
};

ButtonSpinner.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default ButtonSpinner;

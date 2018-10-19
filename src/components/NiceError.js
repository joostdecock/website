import React from "react";
import PropTypes from "prop-types";
import { camelCase } from "../utils";
import { FormattedMessage } from "react-intl";

const NiceError = props => {
  return <FormattedMessage id={"errors." + camelCase(props.err.message)} />;
};

NiceError.propTypes = {
  err: PropTypes.object.isRequired
};

export default NiceError;

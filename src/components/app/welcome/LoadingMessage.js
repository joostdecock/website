import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingMessage = ({ language }) => {
  return (
    <div className="content pt20 mh60vh txt-center">
      <h1>
        <FormattedMessage id="app.justAMoment" />
      </h1>
      <h5>
        <FormattedMessage id="app.weAreValidatingYourConfirmationCode" />
      </h5>
      <div className="pt20 mt10">
        <CircularProgress size={120} thickness={1} />
      </div>
    </div>
  );
};

LoadingMessage.propTypes = {
  language: PropTypes.string.isRequired
};

export default LoadingMessage;

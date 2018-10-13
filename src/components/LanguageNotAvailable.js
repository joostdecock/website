import React from "react";
import { FormattedMessage } from "react-intl";
import LanguageIcon from "@material-ui/icons/Language";
import Message from "./Message";

const LanguageNotAvailable = props => {
  return (
    <Message type="warning">
      <LanguageIcon />
      <h3>
        <FormattedMessage id="app.thisContentIsNotAvailableInLanguage" />
      </h3>
      <p>
        <FormattedMessage id="app.contentLocaleFallback" />
      </p>
    </Message>
  );
};

export default LanguageNotAvailable;

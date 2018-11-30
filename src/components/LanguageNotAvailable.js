import React from "react";
import { FormattedMessage } from "react-intl";
import LanguageIcon from "@material-ui/icons/Language";
import Button from "@material-ui/core/Button";
import Tray from "./Tray";

const LanguageNotAvailable = props => {
  return (
    <Tray
      className="warning my1"
      icon={<LanguageIcon />}
      title={<FormattedMessage id="app.thisContentIsNotAvailableInLanguage" />}
      footer={
        <Button
          href="https://developer.freesewing.org/i18n"
          target="_BLANK"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="app.helpUsTranslate" />
        </Button>
      }
    >
      <p>
        <FormattedMessage id="app.contentLocaleFallback" />
      </p>
    </Tray>
  );
};

export default LanguageNotAvailable;

import React from "react";
import { FormattedMessage } from "react-intl";
import LanguageIcon from "@material-ui/icons/Language";
import Button from "@material-ui/core/Button";
import Tray from "./Tray";
import { Link } from "gatsby";

const LanguageNotAvailable = props => {
  return (
    <Tray
      className="warning my1"
      icon={<LanguageIcon />}
      title={<FormattedMessage id="app.thisContentIsNotAvailableInLanguage" />}
      footer={
        <Link to={"/" + props.language + "/docs/translator"}>
          <Button>
            <FormattedMessage id="app.helpUsTranslate" />
          </Button>
        </Link>
      }
    >
      <p>
        <FormattedMessage id="app.contentLocaleFallback" />
      </p>
    </Tray>
  );
};

export default LanguageNotAvailable;

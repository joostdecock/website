import React from "react";
import { FormattedMessage } from "react-intl";
import LanguageIcon from "@material-ui/icons/Language";
import Button from "@material-ui/core/Button";
import Tray from "./Tray";
import TrayTitle from "./TrayTitle";
import TrayFooter from "./TrayFooter";
import { Link } from "gatsby";
import { locLang } from "../utils";

const LanguageNotAvailable = props => {
  return (
    <Tray className="warning my1">
      <TrayTitle icon={<LanguageIcon />}>
        <FormattedMessage id="app.thisContentIsNotAvailableInLanguage" />
      </TrayTitle>
      <p>
        <FormattedMessage id="app.contentLocaleFallback" />
      </p>
      <TrayFooter>
        <Link to={locLang.set("/docs/i18n", props.language)}>
          <Button>
            <FormattedMessage id="app.helpUsTranslate" />
          </Button>
        </Link>
      </TrayFooter>
    </Tray>
  );
};

export default LanguageNotAvailable;

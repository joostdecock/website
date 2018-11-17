import React from "react";
import { FormattedMessage } from "react-intl";
import LanguageIcon from "@material-ui/icons/Language";
import Button from "@material-ui/core/Button";
import Tray from "./Tray";
import { Link } from "gatsby";
import { locLang } from "../utils";

const LanguageNotAlwaysAvailable = props => {
  return (
    <Tray
      className="warning my1"
      icon={<LanguageIcon />}
      title={
        <FormattedMessage id="app.notAllOfThisContentIsAvailableInLanguage" />
      }
      footer={
        <Link to={locLang.set("/docs/i18n", props.language)}>
          <Button>
            <FormattedMessage id="app.helpUsTranslate" />
          </Button>
        </Link>
      }
    >
      <ul>
        <li>
          <FormattedMessage id="app.colourYes" />
        </li>
        <li>
          <FormattedMessage id="app.monochromeNo" />
        </li>
      </ul>
    </Tray>
  );
};

export default LanguageNotAlwaysAvailable;

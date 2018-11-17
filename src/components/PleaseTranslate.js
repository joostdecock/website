import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import TranslateIcon from "@material-ui/icons/Translate";
import { fileOnGithub, locLang } from "../utils";
import { Link } from "gatsby";
import Tray from "./Tray";

const PleaseTranslate = props => {
  let documentationForTranslators = (
    <Link to={locLang.set("/docs/i18n/", props.language)}>
      <FormattedMessage id="app.documentationForTranslators" />
    </Link>
  );
  let startTranslatingNow = (
    <a href={fileOnGithub(props.filePath)}>
      <FormattedMessage id="app.startTranslatingNow" />
    </a>
  );
  return (
    <Tray
      className={props.className}
      icon={<TranslateIcon />}
      title={<FormattedMessage id="app.couldYouTranslateThis" />}
    >
      <p>
        <FormattedMessage id="app.becauseThatWouldBeReallyHelpful" />
        <br />
        <FormattedMessage
          id="app.startTranslatingNowOrRead"
          values={{
            startTranslatingNow,
            documentationForTranslators
          }}
        />
      </p>
    </Tray>
  );
};

PleaseTranslate.propTypes = {
  language: PropTypes.string.isRequired,
  filePath: PropTypes.string.isRequired,
  className: PropTypes.string
};

PleaseTranslate.defaultProps = {
  className: ""
};

export default PleaseTranslate;

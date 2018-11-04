import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import TranslateIcon from "@material-ui/icons/Translate";
import Message from "./Message";
import { fileOnGithub, locLang } from "../utils";
import { Link } from "gatsby";

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
    <Message>
      <TranslateIcon />
      <h3>
        <FormattedMessage id="app.couldYouTranslateThis" />
      </h3>
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
    </Message>
  );
};

PleaseTranslate.propTypes = {
  language: PropTypes.string.isRequired,
  filePath: PropTypes.string.isRequired
};

export default PleaseTranslate;

import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import TranslateIcon from "@material-ui/icons/Translate";
import Message from "./Message";
import { fileOnGithub, locLang } from "../utils";
import { Link } from "gatsby";
import Tray from "./Tray";
import TrayTitle from "./TrayTitle";
import TrayFooter from "./TrayFooter";
import TocIcon from "@material-ui/icons/Bookmark";

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
    <Tray className={props.className}>
      <TrayTitle icon={<TranslateIcon />}>
        <FormattedMessage id="app.couldYouTranslateThis" />
      </TrayTitle>
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
      <TrayFooter />
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

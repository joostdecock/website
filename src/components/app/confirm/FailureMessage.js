import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import failureGif from "./fail.gif";
import { Link } from "gatsby";
import { locLang } from "../../../utils";

const LoadingMessage = ({ language, id }) => {
  return (
    <div className="content pt20 mh60vh txt-center">
      <h1>
        <FormattedMessage id="app.ohNo" />
      </h1>
      <h5>
        <FormattedMessage id="app.weCouldNotValidateYourConfirmationCode" />
      </h5>
      <div className="pt20 mt10">
        <img src={failureGif} alt="Fail" />
      </div>
      <p className="meta">
        <FormattedMessage id="errors.confirmationNotFound" />
        <br />
        <a
          target="_BLANK"
          rel="noopener noreferrer"
          href={
            "https://github.com/freesewing/website/issues/new?title=Unable to confirm " +
            id
          }
        >
          <FormattedMessage id="app.reportThisOnGitHub" />
        </a>
        &nbsp;|&nbsp;
        <Link to={locLang.set("/contact", language)}>
          <FormattedMessage id="app.contactUs" />
        </Link>
      </p>
    </div>
  );
};

LoadingMessage.propTypes = {
  language: PropTypes.string.isRequired
};

export default LoadingMessage;

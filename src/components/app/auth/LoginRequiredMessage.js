import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { slugForLanguage, languageFromSlug } from "../../../utils";
import LoginIcon from "@material-ui/icons/VpnKey";
import SignupIcon from "@material-ui/icons/PersonAdd";
import Button from "@material-ui/core/Button";
import ButtonSpinner from "../../ButtonSpinner";

const LoginRequiredMessage = ({ slug }) => {
  let language = languageFromSlug(slug);
  return (
    <div className="content pt20 mh60vh txt-center">
      <h1>
        <FormattedMessage id="app.youAreNotLoggedIn" />
      </h1>
      <h5>
        <FormattedMessage id="app.thisPageRequiresAuthentication" />
      </h5>
      <br />
      <Button
        href={slugForLanguage("/login", language)}
        color="primary"
        size="large"
        variant="contained"
      >
        <ButtonSpinner
          loading={false}
          icon={<LoginIcon className="btn-icon" />}
        />
        <FormattedMessage id="app.logIn" />
      </Button>
      <br />
      <Button
        classes={{ root: "mt10" }}
        href={slugForLanguage("/signup", language)}
        color="secondary"
        size="large"
        variant="contained"
      >
        <ButtonSpinner
          loading={false}
          icon={<SignupIcon className="btn-icon" />}
        />
        <FormattedMessage id="app.signUp" />
      </Button>
    </div>
  );
};

LoginRequiredMessage.propTypes = {
  language: PropTypes.string.isRequired
};

export default LoginRequiredMessage;

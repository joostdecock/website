import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "gatsby";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { slugForLanguage } from "../../../utils";

const ResetPasswordForm = ({
  language,
  handleToggleTrouble,
  handlePasswordReset
}) => {
  return (
    <div>
      <h1 className="txt-center">
        <FormattedMessage id="app.troubleLoggingIn" />
      </h1>
      <h3 className="txt-left">
        <FormattedMessage id="app.iForgotMyUsername" />
      </h3>
      <p className="txt-left">
        <FormattedMessage id="app.emailWorksToo" />
        :&nbsp;
        <a href="#trouble" className="mimic" onClick={handleToggleTrouble}>
          <FormattedMessage id="app.logIn" />
        </a>
      </p>
      <h3 className="txt-left">
        <FormattedMessage id="app.iForgotMyPassword" />
      </h3>
      <p className="txt-left">
        <FormattedHTMLMessage id="app.forgotLoginInstructions" />.
      </p>
      <form>
        <TextField
          id="username"
          autoFocus={true}
          fullWidth={true}
          autoComplete="username"
          label="Email address"
          margin="normal"
          variant="outlined"
        />
      </form>
      <Button
        color="primary"
        size="large"
        variant="contained"
        onClick={handlePasswordReset}
      >
        <FormattedMessage id="app.resetPassword" />
      </Button>
      <p className="pt20">
        <a href="#trouble" className="mimic" onClick={handleToggleTrouble}>
          <FormattedMessage id="app.logIn" />
        </a>
        &nbsp;|&nbsp;
        <Link to={slugForLanguage("/signup", language)}>
          <FormattedMessage id="app.signUpForAFreeAccount" />
        </Link>
        &nbsp;|&nbsp;
        <Link to={slugForLanguage("/contact", language)}>
          <FormattedMessage id="app.contactUs" />
        </Link>
      </p>
    </div>
  );
};

ResetPasswordForm.propTypes = {
  handleToggleTrouble: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
};

export default ResetPasswordForm;

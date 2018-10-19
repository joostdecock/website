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
  handlePasswordReset,
  intl
}) => {
  return (
    <div>
      <h2 className="txt-left">
        <FormattedMessage id="app.troubleLoggingIn" />
      </h2>
      <ul className="txt-left">
        <li>
          <FormattedHTMLMessage id="app.emailWorksToo" />
        </li>
        <li>
          <FormattedHTMLMessage id="app.forgotLoginInstructions" />.
        </li>
      </ul>
      <form>
        <TextField
          id="username"
          autoFocus={true}
          fullWidth={true}
          autoComplete="username"
          label={intl.formatMessage({ id: "app.emailAddress" })}
          margin="normal"
          variant="outlined"
        />
        <Button
          color="primary"
          size="large"
          variant="contained"
          onClick={handlePasswordReset}
          classes={{ root: "mt10" }}
        >
          <FormattedMessage id="app.resetPassword" />
        </Button>
      </form>
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
    </div>
  );
};

ResetPasswordForm.propTypes = {
  handleToggleTrouble: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
};

export default ResetPasswordForm;

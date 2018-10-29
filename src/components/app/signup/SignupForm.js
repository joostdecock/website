import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import SignupIcon from "@material-ui/icons/PersonAdd";
import Button from "@material-ui/core/Button";
import { Link } from "gatsby";
import { FormattedMessage } from "react-intl";
import { slugForLanguage } from "../../../utils";
import ButtonSpinner from "../../ButtonSpinner";

const SignupForm = ({
  loading,
  language,
  email,
  password,
  handleSignup,
  handleEmailUpdate,
  handlePasswordUpdate,
  handleResend,
  intl
}) => {
  return (
    <div>
      <h1 className="txt-center">
        <FormattedMessage id="app.signUp" />
      </h1>
      <h5 className="mb20">
        <FormattedMessage id="app.enterEmailPickPassword" />
      </h5>
      <form onSubmit={handleSignup}>
        <TextField
          id="email"
          autoFocus={true}
          fullWidth={true}
          autoComplete="email"
          label={intl.formatMessage({ id: "app.emailAddress" })}
          helperText={intl.formatMessage({ id: "app.weNeverShareYourEmail" })}
          margin="normal"
          variant="outlined"
          value={email}
          onChange={handleEmailUpdate}
        />
        <TextField
          id="password"
          fullWidth={true}
          type="password"
          autoComplete="password"
          label={intl.formatMessage({ id: "app.password" })}
          helperText={intl.formatMessage({ id: "app.noPasswordPolicy" })}
          margin="normal"
          variant="outlined"
          value={password}
          onChange={handlePasswordUpdate}
        />
        <Button
          type="submit"
          color="primary"
          size="large"
          variant="contained"
          disabled={loading}
          classes={{ root: "mt10" }}
        >
          <ButtonSpinner
            loading={loading}
            icon={<SignupIcon className="btn-icon" />}
          />
          <FormattedMessage id="app.signUp" />
        </Button>
      </form>
      <Link to={slugForLanguage("/login", language)}>
        <FormattedMessage id="app.logIn" />
      </Link>
      &nbsp;|&nbsp;
      <a href="#resend" className="mimic" onClick={handleResend}>
        <FormattedMessage id="app.resendActivationEmail" />
      </a>
    </div>
  );
};

SignupForm.propTypes = {
  handleSignup: PropTypes.func.isRequired,
  handleResend: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
};

export default SignupForm;

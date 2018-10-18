import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "gatsby";
import { FormattedMessage } from "react-intl";
import { slugForLanguage } from "../../../utils";

const LoginForm = ({ language, handleToggleTrouble, handleLogin }) => {
  return (
    <div>
      <h1 className="txt-center">
        <FormattedMessage id="app.logIn" />
      </h1>
      <form>
        <TextField
          id="username"
          autoFocus={true}
          fullWidth={true}
          autoComplete="username"
          label="Username or email"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="password"
          fullWidth={true}
          type="password"
          autoComplete="password"
          label="Password"
          margin="normal"
          variant="outlined"
        />
      </form>
      <Button
        color="primary"
        size="large"
        variant="contained"
        onClick={handleLogin}
      >
        <FormattedMessage id="app.logIn" />
      </Button>
      <p className="pt20">
        <a href="#trouble" className="mimic" onClick={handleToggleTrouble}>
          <FormattedMessage id="app.troubleLoggingIn" />
        </a>
        &nbsp;|&nbsp;
        <Link to={slugForLanguage("/signup", language)}>
          <FormattedMessage id="app.signUpForAFreeAccount" />
        </Link>
      </p>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleToggleTrouble: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
};

export default LoginForm;

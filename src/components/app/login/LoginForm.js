import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import LoginIcon from "@material-ui/icons/VpnKey";
import Button from "@material-ui/core/Button";
import { Link } from "gatsby";
import { FormattedMessage } from "react-intl";
import { slugForLanguage } from "../../../utils";
import ButtonSpinner from "../../ButtonSpinner";

const LoginForm = ({
  loading,
  language,
  username,
  password,
  handleLogin,
  handleUsernameUpdate,
  handlePasswordUpdate,
  handleToggleTrouble
}) => {
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
          value={username}
          onChange={handleUsernameUpdate}
        />
        <TextField
          id="password"
          fullWidth={true}
          type="password"
          autoComplete="password"
          label="Password"
          margin="normal"
          variant="outlined"
          value={password}
          onChange={handlePasswordUpdate}
        />
        <Button
          color="primary"
          size="large"
          variant="contained"
          onClick={handleLogin}
          disabled={loading}
          classes={{ root: "mt10" }}
        >
          <ButtonSpinner
            loading={loading}
            icon={<LoginIcon className="btn-icon" />}
          />
          <FormattedMessage id="app.logIn" />
        </Button>
      </form>
      <a href="#trouble" className="mimic" onClick={handleToggleTrouble}>
        <FormattedMessage id="app.troubleLoggingIn" />
      </a>
      &nbsp;|&nbsp;
      <Link to={slugForLanguage("/signup", language)}>
        <FormattedMessage id="app.signUpForAFreeAccount" />
      </Link>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleToggleTrouble: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
};

export default LoginForm;

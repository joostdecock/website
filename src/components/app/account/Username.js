import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { FormattedMessage } from "react-intl";

function Username({ username, handleUsernameChange, intl }) {
  return (
    <div>
      <h5>
        <FormattedMessage id="app.welcomeUsernameTitle" />
      </h5>
      <TextField
        id="username"
        fullWidth={true}
        autoComplete="username"
        label={intl.formatMessage({ id: "account.username" })}
        margin="normal"
        variant="outlined"
        value={username}
        onChange={handleUsernameChange}
      />
    </div>
  );
}

Username.propTypes = {
  units: PropTypes.oneOf(["metric", "imperial"]),
  handleUnitsChange: PropTypes.func
};

export default Username;

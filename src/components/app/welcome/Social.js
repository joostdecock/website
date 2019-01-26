import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { FormattedMessage } from "react-intl";
import InputAdornment from "@material-ui/core/InputAdornment";

function Social({
  github,
  twitter,
  instagram,
  handleGithubChange,
  handleTwitterChange,
  handleInstagramChange,
  intl
}) {
  let at = {
    startAdornment: <InputAdornment position="start">@</InputAdornment>
  };
  return (
    <div>
      <h5>
        <FormattedMessage id="account.socialTitle" />
      </h5>
      <TextField
        id="github"
        fullWidth={true}
        label={intl.formatMessage({ id: "app.github" })}
        margin="normal"
        variant="outlined"
        value={github}
        onChange={handleGithubChange}
        InputProps={at}
      />
      <TextField
        id="twitter"
        fullWidth={true}
        label={intl.formatMessage({ id: "app.twitter" })}
        margin="normal"
        variant="outlined"
        value={twitter}
        onChange={handleTwitterChange}
        InputProps={at}
      />
      <TextField
        id="instagram"
        fullWidth={true}
        label={intl.formatMessage({ id: "app.instagram" })}
        margin="normal"
        variant="outlined"
        value={instagram}
        onChange={handleInstagramChange}
        InputProps={at}
      />
    </div>
  );
}

Social.propTypes = {
  github: PropTypes.string,
  twitter: PropTypes.string,
  instagram: PropTypes.string,
  handleGithubChange: PropTypes.func,
  handleTwitterChange: PropTypes.func,
  handleInstagramChange: PropTypes.func
};

export default Social;

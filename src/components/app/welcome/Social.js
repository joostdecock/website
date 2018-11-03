import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { FormattedMessage } from "react-intl";

function Social({
  github,
  twitter,
  instagram,
  handleGithubChange,
  handleTwitterChange,
  handleInstagramChange,
  intl
}) {
  return (
    <div>
      <h5>
        <FormattedMessage id="app.welcomeUsernameTitle" />
      </h5>
      <TextField
        id="github"
        fullWidth={true}
        label={intl.formatMessage({ id: "app.github" })}
        margin="normal"
        variant="outlined"
        value={github}
        onChange={handleGithubChange}
      />
      <TextField
        id="twitter"
        fullWidth={true}
        label={intl.formatMessage({ id: "app.twitter" })}
        margin="normal"
        variant="outlined"
        value={twitter}
        onChange={handleTwitterChange}
      />
      <TextField
        id="instagram"
        fullWidth={true}
        label={intl.formatMessage({ id: "app.instagram" })}
        margin="normal"
        variant="outlined"
        value={instagram}
        onChange={handleInstagramChange}
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

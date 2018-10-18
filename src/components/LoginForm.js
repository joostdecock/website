import React from "react";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "gatsby";
import { slugForLanguage } from "../utils";
import SplashBox from "./SplashBox";

export default class LoginForm extends React.Component {
  language = this.props.language;
  state = {
    trouble: false
  };

  handleToggleTrouble = () => {
    this.setState({
      trouble: !this.state.trouble
    });
  };

  handlePasswordReset = () => {
    console.log("FIXME: Password reset");
  };

  troubleContent = (
    <div id="trouble">
      <h1 className="txt-center">
        <FormattedMessage id="app.troubleLoggingIn" />
      </h1>
      <h3 className="txt-left">
        <FormattedMessage id="app.iForgotMyUsername" />
      </h3>
      <p className="txt-left">
        <FormattedMessage id="app.emailWorksToo" />
        :&nbsp;
        <a href="#trouble" className="mimic" onClick={this.handleToggleTrouble}>
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
      <Button color="primary" size="large" variant="contained">
        <FormattedMessage id="app.resetPassword" />
      </Button>
      <p className="pt20">
        <a href="#trouble" className="mimic" onClick={this.handleToggleTrouble}>
          <FormattedMessage id="app.logIn" />
        </a>
        &nbsp;|&nbsp;
        <Link to={slugForLanguage("/signup", this.language)}>
          <FormattedMessage id="app.signUpForAFreeAccount" />
        </Link>
        &nbsp;|&nbsp;
        <Link to={slugForLanguage("/contact", this.language)}>
          <FormattedMessage id="app.contactUs" />
        </Link>
      </p>
    </div>
  );
  loginContent = (
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
      <Button color="primary" size="large" variant="contained">
        <FormattedMessage id="app.logIn" />
      </Button>
      <p className="pt20">
        <a href="#trouble" className="mimic" onClick={this.handleToggleTrouble}>
          <FormattedMessage id="app.troubleLoggingIn" />
        </a>
        &nbsp;|&nbsp;
        <Link to={slugForLanguage("/signup", this.language)}>
          <FormattedMessage id="app.signUpForAFreeAccount" />
        </Link>
      </p>
    </div>
  );
  render() {
    return (
      <SplashBox>
        {this.state.trouble ? this.troubleContent : this.loginContent}
      </SplashBox>
    );
  }
}

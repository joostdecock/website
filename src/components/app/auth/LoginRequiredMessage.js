import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { locLang } from "../../../utils";
import LoginIcon from "@material-ui/icons/VpnKey";
import SignupIcon from "@material-ui/icons/PersonAdd";
import Button from "@material-ui/core/Button";
import ButtonSpinner from "../../ButtonSpinner";

const LoginRequiredMessage = ({ location }) => {
  let language = locLang.get(location);
  return (
    <div className="pt1 mt1 minh70vh txt-center">
      <h1>
        <FormattedMessage id="app.youAreNotLoggedIn" />
      </h1>
      <h5>
        <FormattedMessage id="app.thisPageRequiresAuthentication" />
      </h5>
      <p className="my1">
        <Button
          href={locLang.set("/login", language)}
          color="primary"
          size="large"
          variant="contained"
          className="mr1"
        >
          <ButtonSpinner
            loading={false}
            icon={<LoginIcon className="btn-icon" />}
          />
          <FormattedMessage id="app.logIn" />
        </Button>
        <Button
          classes={{ root: "mt10" }}
          href={locLang.set("/signup", language)}
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
      </p>
    </div>
  );
};

LoginRequiredMessage.propTypes = {
  language: PropTypes.string.isRequired
};

export default LoginRequiredMessage;

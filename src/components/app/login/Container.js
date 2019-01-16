import React from "react";
import PasswordLogin from "../auth/providers/PasswordLogin";
import LoginProviders from "../auth/providers/Container";

const LoginContainer = props => {
  return (
    <React.Fragment>
      <PasswordLogin />
      <div className="mt2">
        <LoginProviders login language={props.language} />
      </div>
    </React.Fragment>
  );
};

export default LoginContainer;

import React from "react";
import PasswordSignup from "../auth/providers/PasswordSignup";
import SignupProviders from "../auth/providers/Container";

const SignupContainer = props => {
  return (
    <React.Fragment>
      <PasswordSignup />
      <div className="mt2">
        <SignupProviders language={props.language} />
      </div>
    </React.Fragment>
  );
};

export default SignupContainer;

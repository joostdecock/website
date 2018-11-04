import React from "react";
import BaseLayout from "../layouts/Base";
import LoginContainer from "../app/login/Container";

const Login = props => {
  return (
    <BaseLayout splash={true}>
      <LoginContainer />
    </BaseLayout>
  );
};

export default Login;

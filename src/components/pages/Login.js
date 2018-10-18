import React from "react";
import BaseLayout from "../layouts/Base";
import LoginContainer from "../app/login/Container";

const Login = props => {
  return (
    <BaseLayout slug={props.pageContext.slug} splash={true}>
      <LoginContainer
        slug={props.pageContext.slug}
        language={props.pageContext.language}
      />
    </BaseLayout>
  );
};

export default Login;

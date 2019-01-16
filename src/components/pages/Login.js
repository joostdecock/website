import React from "react";
import BaseLayout from "../layouts/Base";
import Center from "../Center";
import LoginContainer from "../app/login/Container";
import Breadcrumbs from "../Breadcrumbs";
import { FormattedMessage } from "react-intl";

const Login = props => {
  return (
    <BaseLayout>
      <Breadcrumbs>
        <FormattedMessage id="app.logIn" />
      </Breadcrumbs>
      <Center maxWidth={650}>
        <h1 className="txt-center">
          <FormattedMessage id="app.logIn" />
        </h1>
        <LoginContainer language={props.pageContext.language} />
      </Center>
    </BaseLayout>
  );
};

export default Login;

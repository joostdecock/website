import React from "react";
import BaseLayout from "../layouts/Base";
import Center from "../Center";
import SignupContainer from "../app/signup/Container";
import Breadcrumbs from "../Breadcrumbs";
import { FormattedMessage } from "react-intl";

const Signup = props => {
  return (
    <BaseLayout>
      <Breadcrumbs>
        <FormattedMessage id="app.signUp" />
      </Breadcrumbs>
      <Center maxWidth={650}>
        <h1 className="txt-center">
          <FormattedMessage id="app.signUp" />
        </h1>
        <SignupContainer language={props.pageContext.language} />
      </Center>
    </BaseLayout>
  );
};

export default Signup;

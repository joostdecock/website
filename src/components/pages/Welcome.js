import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import WelcomeContainer from "../app/welcome/Container";

const Welcome = props => (
  <BaseLayout>
    <AuthContainer>
      <WelcomeContainer data={props.pageContext.data} />
    </AuthContainer>
  </BaseLayout>
);

export default Welcome;

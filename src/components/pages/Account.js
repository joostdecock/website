import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import AccountContainer from "../app/account/Container";

const Account = props => (
  <BaseLayout>
    <AuthContainer>
      <AccountContainer {...props.pageContext} />
    </AuthContainer>
  </BaseLayout>
);

export default Account;

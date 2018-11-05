import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import AccountContainer from "../app/account/Container";

const Account = () => (
  <BaseLayout>
    <AuthContainer>
      <AccountContainer />
    </AuthContainer>
  </BaseLayout>
);

export default Account;

import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import AccountRemoveContainer from "../app/account/remove/Container";

const AccountRemove = props => (
  <BaseLayout>
    <AuthContainer>
      <AccountRemoveContainer />
    </AuthContainer>
  </BaseLayout>
);

export default AccountRemove;

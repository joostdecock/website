import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import AccountRestrictContainer from "../app/account/restrict/Container";

const AccountRestrict = props => (
  <BaseLayout>
    <AuthContainer>
      <AccountRestrictContainer />
    </AuthContainer>
  </BaseLayout>
);

export default AccountRestrict;

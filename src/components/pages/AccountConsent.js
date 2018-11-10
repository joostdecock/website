import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import AccountConsentContainer from "../app/account/consent/Container";

const AccountConsent = props => (
  <BaseLayout>
    <AuthContainer>
      <AccountConsentContainer />
    </AuthContainer>
  </BaseLayout>
);

export default AccountConsent;

import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import AccountExportContainer from "../app/account/export/Container";

const AccountExport = props => (
  <BaseLayout>
    <AuthContainer>
      <AccountExportContainer data={props.pageContext.data} />
    </AuthContainer>
  </BaseLayout>
);

export default AccountExport;

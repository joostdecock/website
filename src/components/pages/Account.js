import React from "react";
import BaseLayout from "../layouts/Base";
import AccountContainer from "../app/account/Container";

const Account = props => {
  return (
    <BaseLayout slug={props.pageContext.slug}>
      <AccountContainer
        slug={props.pageContext.slug}
        language={props.pageContext.language}
        intl={props.intl}
      />
    </BaseLayout>
  );
};

export default Account;

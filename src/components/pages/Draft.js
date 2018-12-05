import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import DraftContainer from "../app/draft/Container";

const Draft = props => (
  <BaseLayout>
    <AuthContainer>
      <DraftContainer {...props.pageContext} />
    </AuthContainer>
  </BaseLayout>
);

export default Draft;

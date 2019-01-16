import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import DraftsContainer from "../app/drafts/Container";

const Drafts = props => (
  <BaseLayout>
    <AuthContainer>
      <DraftsContainer />
    </AuthContainer>
  </BaseLayout>
);

export default Drafts;

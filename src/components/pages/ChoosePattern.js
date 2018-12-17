import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import ChoosePattern from "../app/draft/ChoosePattern";

const ChoosePatternPage = props => (
  <BaseLayout>
    <AuthContainer>
      <ChoosePattern {...props.pageContext} />
    </AuthContainer>
  </BaseLayout>
);

export default ChoosePatternPage;

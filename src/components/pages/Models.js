import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import ModelsContainer from "../app/models/Container";

const Models = props => (
  <BaseLayout>
    <AuthContainer>
      <ModelsContainer />
    </AuthContainer>
  </BaseLayout>
);

export default Models;

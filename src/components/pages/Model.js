import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import ModelContainer from "../app/model/Container";

const Model = props => (
  <BaseLayout>
    <AuthContainer>
      <ModelContainer data={props.pageContext.data} />
    </AuthContainer>
  </BaseLayout>
);

export default Model;

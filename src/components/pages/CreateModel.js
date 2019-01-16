import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import CreateModelContainer from "../app/model/CreateContainer";

const CreateModel = props => (
  <BaseLayout>
    <AuthContainer>
      <CreateModelContainer />
    </AuthContainer>
  </BaseLayout>
);

export default CreateModel;

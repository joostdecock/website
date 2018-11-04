import React from "react";
import BaseLayout from "../layouts/Base";
import SignupContainer from "../app/signup/Container";

const Signup = () => (
  <BaseLayout splash={true}>
    <SignupContainer />
  </BaseLayout>
);

export default Signup;

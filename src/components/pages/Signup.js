import React from "react";
import BaseLayout from "../layouts/Base";
import SignupContainer from "../app/signup/Container";

const Signup = props => {
  return (
    <BaseLayout slug={props.pageContext.slug} splash={true}>
      <SignupContainer
        slug={props.pageContext.slug}
        language={props.pageContext.language}
        intl={props.intl}
      />
    </BaseLayout>
  );
};

export default Signup;

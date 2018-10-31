import React from "react";
import BaseLayout from "../layouts/Base";
import ConfirmContainer from "../app/confirm/Container";

const Signup = props => {
  console.log("page props", props);
  return (
    <BaseLayout slug={props.pageContext.slug}>
      <ConfirmContainer
        slug={props.pageContext.slug}
        language={props.pageContext.language}
        intl={props.intl}
        location={props.location}
      />
    </BaseLayout>
  );
};

export default Signup;

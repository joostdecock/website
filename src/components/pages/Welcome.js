import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import WelcomeContainer from "../app/welcome/Container";
//import { languageFromSlug } from "../../../utils";

const Welcome = props => {
  console.log("page props", props);
  return (
    <BaseLayout slug={props.pageContext.slug}>
      <AuthContainer slug={props.pageContext.slug}>
        <WelcomeContainer
          slug={props.pageContext.slug}
          intl={props.intl}
          location={props.location}
        />
      </AuthContainer>
    </BaseLayout>
  );
};

export default Welcome;

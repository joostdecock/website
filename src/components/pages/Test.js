import React from "react";
import BaseLayout from "../layouts/Base";
import Center from "../Center";
import PasswordSignup from "../app/auth/providers/PasswordSignup";
import SignupProviders from "../app/auth/providers/Container";

class Test extends React.Component {
  render() {
    return (
      <BaseLayout>
        <Center>
          <h1>Signup test page</h1>
          <PasswordSignup />
          <div className="mt2">
            <SignupProviders />
          </div>
        </Center>
      </BaseLayout>
    );
  }
}

export default Test;

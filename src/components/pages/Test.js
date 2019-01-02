import React from "react";
import BaseLayout from "../layouts/Base";
import Center from "../Center";
import Intro from "../homepage/Intro";

class Test extends React.Component {
  render() {
    return (
      <BaseLayout>
        <h1>test</h1>
        <Center>
          <Intro />
        </Center>
      </BaseLayout>
    );
  }
}

export default Test;

import React from "react";
import BaseLayout from "../layouts/Base";
import Spinner from "../Spinner";
import Center from "../Center";

class Test extends React.Component {
  render() {
    return (
      <BaseLayout>
        <h1>test</h1>
        <Center>
          <Spinner size="240" />
        </Center>
      </BaseLayout>
    );
  }
}

export default Test;

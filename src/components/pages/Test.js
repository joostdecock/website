import React from "react";
import BaseLayout from "../layouts/Base";
import Center from "../Center";
import Spinner from "../Spinner";

class Test extends React.Component {
  render() {
    return (
      <BaseLayout>
        <Center>
          <Spinner size={250} />
        </Center>
      </BaseLayout>
    );
  }
}

export default Test;

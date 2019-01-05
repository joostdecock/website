import React from "react";
import BaseLayout from "../layouts/Base";
import Center from "../Center";
import Spinner from "../Spinner";

class Test extends React.Component {
  render() {
    return (
      <BaseLayout>
        <h1>test page</h1>
        <div className="vspacer" />
        <Center>
          <Spinner size={250} />
        </Center>
      </BaseLayout>
    );
  }
}

export default Test;

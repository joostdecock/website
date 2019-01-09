import React from "react";
import BaseLayout from "../layouts/Base";
import Column from "../Column";
import TwoColumns from "../TwoColumns";
import FieldDrawers from "../fields/FieldDrawers";
import { modelFields } from "../../config/fields";

class Test extends React.Component {
  render() {
    return (
      <BaseLayout>
        <h1>test page</h1>
        <TwoColumns wrapReverse={true}>
          <Column wide />
          <Column narrow right>
            <FieldDrawers config={modelFields} methods={{}} />
          </Column>
        </TwoColumns>
      </BaseLayout>
    );
  }
}

export default Test;

import React from "react";
import BaseLayout from "../layouts/Base";
import PlaygroundContainer from "../app/playground/Container";
import { patternList } from "@freesewing/patterns";

const Playground = props => {
  let pattern = props["*"].split("/").pop();
  if (patternList.indexOf(pattern) === -1) pattern = false;
  return (
    <BaseLayout>
      <PlaygroundContainer {...props.pageContext} pattern={pattern} />
    </BaseLayout>
  );
};

export default Playground;

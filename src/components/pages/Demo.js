import React from "react";
import BaseLayout from "../layouts/Base";
import DemoContainer from "../app/demo/Container";
import { patternList } from "@freesewing/patterns";

const Demo = props => {
  let pattern = props["*"].split("/").pop();
  if (patternList.indexOf(pattern) === -1) pattern = false;
  return (
    <BaseLayout>
      <DemoContainer {...props.pageContext} pattern={pattern} />
    </BaseLayout>
  );
};

export default Demo;

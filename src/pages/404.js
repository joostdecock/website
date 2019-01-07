import React from "react";
import BaseLayout from "../components/layouts/Base";
import NotFound from "../components/NotFound";

const oops = props => (
  <BaseLayout>
    <NotFound language={props.pageContext.language} />
  </BaseLayout>
);

export default oops;

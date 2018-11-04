import React from "react";
import BaseLayout from "./Base";
import Grid from "@material-ui/core/Grid";

export default ({ children }) => (
  <BaseLayout>
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className="page"
    >
      {children}
    </Grid>
  </BaseLayout>
);

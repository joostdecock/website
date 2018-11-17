import React from "react";
import Grid from "@material-ui/core/Grid";

export default props => (
  <Grid item xs={12} sm={10} md={6} lg={6} xl={6}>
    {props.children}
  </Grid>
);

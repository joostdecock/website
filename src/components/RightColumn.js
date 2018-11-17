import React from "react";
import Grid from "@material-ui/core/Grid";

export default props => (
  <Grid
    item
    xs={12}
    sm={10}
    md={6}
    lg={5}
    xl={6}
    className="align-self-stretch pl1nsm"
  >
    {props.children}
  </Grid>
);

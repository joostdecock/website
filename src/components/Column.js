import React from "react";
import Grid from "@material-ui/core/Grid";

function Column(props) {
  return (
    <Grid
      item
      xs={12}
      sm={10}
      md={6}
      lg={6}
      xl={6}
      className={props.side === "left" ? "" : "align-self-stretch pl1nsm"}
    >
      {props.children}
    </Grid>
  );
}

Column.defaultProps = {
  side: "left"
};

export default Column;

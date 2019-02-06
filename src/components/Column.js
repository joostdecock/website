import React from "react";
import Grid from "@material-ui/core/Grid";

function Column(props) {
  let size = 6;
  if (props.wide) size += 2;
  if (props.narrow) size -= 2;
  if (props.less) size -= 1;
  if (props.size) size = props.size;
  let classes = props.className;
  if (props.right) classes = "align-self-stretch pl1nsm";
  return (
    <Grid item xs={12} sm={10} md={size} className={classes}>
      {props.children}
    </Grid>
  );
}

Column.defaultProps = {
  right: false,
  narrow: false,
  wide: false
};

export default Column;

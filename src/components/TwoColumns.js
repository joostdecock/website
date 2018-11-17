import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

const TwoColumns = props => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      wrap={props.wrapReverse ? "wrap-reverse" : "wrap"}
    >
      {props.children}
    </Grid>
  );
};

TwoColumns.propTypes = {
  wrapReverse: PropTypes.bool
};

TwoColumns.defaultProps = {
  wrapReverse: false
};
export default TwoColumns;

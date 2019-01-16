import React from "react";
import { FormattedMessage } from "react-intl";
import Grid from "@material-ui/core/Grid";

const HundredPercent = props => {
  return (
    <Grid
      container
      spacing={40}
      direction="row"
      justify="flex-start"
      wrap="wrap"
    >
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <h2 className="light txt-center">
          <FormattedMessage id="app.100PercentOpenSource" />
        </h2>
        <p className="txt-center">
          <FormattedMessage id="intro.txt-opensource" />
        </p>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <h2 className="light txt-center">
          <FormattedMessage id="app.100PercentCommunity" />
        </h2>
        <p className="txt-center">
          <FormattedMessage id="intro.txt-community" />
        </p>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <h2 className="light txt-center">
          <FormattedMessage id="app.100PercentFree" />
        </h2>
        <p className="txt-center">
          <FormattedMessage id="intro.txt-patrons" />
        </p>
      </Grid>
    </Grid>
  );
};

export default HundredPercent;

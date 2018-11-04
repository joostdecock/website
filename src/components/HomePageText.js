import React from "react";
import Grid from "@material-ui/core/Grid";
import { FormattedMessage } from "react-intl";

export default () => (
  <Grid container direction="row" justify="center" alignItems="center">
    <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
      <h1>
        <FormattedMessage id="app.sewingPatternsForNonAveragePeople" />
      </h1>
      <h4>(the rest of this text is not translated)</h4>
      <p>
        This is a work in progress to build a new freesewing.org frontend to go
        along the JavaScript rewrite of our core library.
      </p>
      <p>
        As this is a work in progress, we really appreciate your input. Join{" "}
        <a href="https://gitter.im/freesewing/freesewing">
          our chatroom on Gitter
        </a>{" "}
        to to discuss this and all things freesewing, or
        <a href="https://github.com/freesewing/website/issues">
          {" "}
          keep an eye on the open issues
        </a>{" "}
        for <a href="https://github.com/freesewing/website">this repository</a>.
      </p>
    </Grid>
  </Grid>
);

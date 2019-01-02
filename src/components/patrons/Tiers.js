import React from "react";
import Grid from "@material-ui/core/Grid";
import Tier from "./Tier";

const Tiers = props => (
  <Grid container spacing={16} direction="row" justify="flex-start" wrap="wrap">
    <Tier tier={0} />
    <Tier tier={2} />
    <Tier tier={4} />
    <Tier tier={8} />
  </Grid>
);

export default Tiers;

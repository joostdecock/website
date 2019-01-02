import React from "react";
import { locLang } from "../../utils";
import { FormattedMessage } from "react-intl";
import Grid from "@material-ui/core/Grid";
import Tier from "./Tier";
import Button from "@material-ui/core/Button";
import medal2 from "./medal-2.svg";
import medal4 from "./medal-4.svg";
import medal8 from "./medal-8.svg";

const Tiers = props => (
  <Grid container spacing={16} direction="row" justify="flex-start" wrap="wrap">
    <Tier tier={0} />
    <Tier tier={2} />
    <Tier tier={4} />
    <Tier tier={8} />
  </Grid>
);

export default Tiers;

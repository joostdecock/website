import React from "react";
import BaseLayout from "../layouts/Base";
import Intro from "../homepage/Intro";
import DemoLink from "../homepage/DemoLink";
import HundredPercent from "../homepage/HundredPercent";
import Cards from "../homepage/Cards";
import BecomeAPatron from "../patrons/BecomeAPatron";
import Grid from "@material-ui/core/Grid";

const HomePage = props => (
  <BaseLayout>
    <div className="vspacer">&nbsp;</div>
    <Grid
      container
      direction="row-reverse"
      justify="center"
      wrapReverse
      spacing={32}
    >
      <Grid item xs={12} sm={12} md={6}>
        <div className="center">
          <Intro />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <DemoLink language={props.pageContext.language} />
      </Grid>
    </Grid>
    <div className="vspacer">&nbsp;</div>
    <HundredPercent language={props.pageContext.language} />
    <div className="vspacer">&nbsp;</div>
    <Cards language={props.pageContext.language} />
    <div className="vspacer">&nbsp;</div>
    <BecomeAPatron language={props.pageContext.language} />
    <div className="vspacer">&nbsp;</div>
  </BaseLayout>
);

export default HomePage;

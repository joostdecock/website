import React from "react"
import BaseLayout from './Base';
import Grid from '@material-ui/core/Grid';

export default ({ children, slug }) => (
  <BaseLayout slug={slug}>
    <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    >
    {children}
    </Grid>
  </BaseLayout>
)

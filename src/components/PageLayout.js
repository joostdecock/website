import React from "react"
import BaseLayout from '../components/BaseLayout';
import FsAppBar from '../components/AppBar';
import Grid from '@material-ui/core/Grid';

export default ({ children }) => (
  <BaseLayout>
    <FsAppBar />
    <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    className="page"
    >
    {children}
    </Grid>
  </BaseLayout>
)

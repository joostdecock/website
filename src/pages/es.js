import React from "react"
import PageLayout from "../components/layouts/Page"
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';

export default ({pageContext}) => (
  <PageLayout slug={pageContext.slug}>
  <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
  >
  <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
  <h1><FormattedMessage id="app.sewingPatternsForNonAveragePeople" /></h1>
  </Grid>
  </Grid>
  </PageLayout>
)

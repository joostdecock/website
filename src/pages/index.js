import React from "react"
import Layout from "../components/layout"
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import FsAppBar from '../components/fsappbar';

export default () => (
  <Layout>
  <FsAppBar />
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
      <h1>freesewing frontend</h1>
<p>This is a work in progress to build a new freesewing.org frontend to go along
the JavaScript rewrite of our core library.
  </p>
<p>As this is a work in progress, we really appreciate your input.
Join <a href="https://gitter.im/freesewing/freesewing">our chatroom on Gitter</a>
 to discuss this and all things freesewing.
  </p>
      <Button variant="contained" color="primary">
        Primary button
      </Button>
      <Button variant="contained" color="secondary">
        Secondary button
      </Button>
      <IconButton aria-label="Delete">
        <SvgIcon>
          <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
        </SvgIcon>
      </IconButton>
      </Grid>
    </Grid>
  </Layout>
)

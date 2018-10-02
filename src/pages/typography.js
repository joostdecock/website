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
        <h1>This is heading 1; Let us make it a bit longer so we can see how it wraps</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <h2>This is heading 2; Let us make it a bit longer so we can see how it wraps</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <h3>This is heading 3; Let us make it a bit longer so we can see how it wraps</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <h4>This is heading 4</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <h5>This is heading 5</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <h6>This is heading 6</h6>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <blockquote>
          <p>This is a blockquote</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </blockquote>

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

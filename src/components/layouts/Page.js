import React from "react";
import BaseLayout from "./Base";
import Grid from "@material-ui/core/Grid";
import { languageFromSlug } from "../../utils";

export default ({ children, slug }) => (
  <BaseLayout slug={slug} language={languageFromSlug(slug)}>
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
);

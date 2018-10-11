import React from "react";
import DocumentationLayout from "../layouts/Documentation";
import Grid from "@material-ui/core/Grid";
import Warning from "../Warning";
import Translate from "@material-ui/icons/Translate";
import { FormattedMessage } from "react-intl";

export default ({ pageContext }) => {
  const frontmatter = pageContext.node.frontmatter;
  const html = pageContext.node.html;
  let warning = false;
  if (pageContext.language !== pageContext.contentLanguage) warning = true;
  return (
    <DocumentationLayout slug={pageContext.slug}>
      <Grid item xs={12} sm={10} md={8} lg={5} xl={4}>
        <div className="docs">
          <h1>{frontmatter.title}</h1>
          <Warning show={warning}>
            <Translate />
            <h3>
              <FormattedMessage id="app.thisContentIsNotAvailableInLanguage" />
            </h3>
            <p>
              <FormattedMessage id="app.contentLocaleFallback" />
            </p>
          </Warning>
          <article dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </Grid>
    </DocumentationLayout>
  );
};

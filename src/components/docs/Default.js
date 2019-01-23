import React from "react";
import Grid from "@material-ui/core/Grid";
import { FormattedMessage } from "react-intl";
import GithubIcon from "../GithubIcon";
import { fileOnGithub, editLink } from "../../utils";
import Tray from "../Tray";
import Breadcrumbs from "../Breadcrumbs";
import TocIcon from "@material-ui/icons/Bookmark";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "gatsby";

const DefaultDocumentation = props => {
  return (
    <React.Fragment>
      <Breadcrumbs via={props.frontmatter.breadcrumbs}>
        {props.frontmatter.title}
      </Breadcrumbs>
      <Grid container direction="row" justify="flex-start" wrap="wrap-reverse">
        <Grid item xs={12} sm={10} md={7} lg={6} xl={6}>
          <h1>
            {props.frontmatter.title}
            &nbsp;&nbsp;
            <Link to={editLink(props.location)}>
              <EditIcon />
            </Link>
            &nbsp;&nbsp;
            <a href={fileOnGithub(props.fileAbsolutePath)}>
              <GithubIcon color={"#2979ff"} />
            </a>
          </h1>
          <article dangerouslySetInnerHTML={{ __html: props.html }} />
          {props.pleaseTranslate}
        </Grid>
        <Grid item xs={false} sm={false} md={false} lg={1} xl={1} />
        <Grid
          item
          xs={12}
          sm={10}
          md={5}
          lg={5}
          xl={4}
          className="align-self-stretch pl1nsm"
        >
          {props.languageNotAvailable}
          {props.measurementsBox}
          <Tray
            className="mb1 stick"
            icon={<TocIcon />}
            title={<FormattedMessage id="app.contents" />}
          >
            <div
              className="toc"
              dangerouslySetInnerHTML={{ __html: props.tableOfContents }}
            />
          </Tray>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DefaultDocumentation;

import React from "react";
import GithubIcon from "../GithubIcon";
import { editLink, fileOnGithub } from "../../utils";
import Breadcrumbs from "../Breadcrumbs";
import Column from "../Column";
import TwoColumns from "../TwoColumns";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "gatsby";

export default props => {
  return (
    <React.Fragment>
      <Breadcrumbs
        via={[
          {
            link: "/docs",
            label: "app.docs"
          },
          {
            link: "/docs/measurements",
            label: "app.measurements"
          }
        ]}
      >
        {props.frontmatter.title}
      </Breadcrumbs>
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
      <TwoColumns>
        <Column wide left>
          <article dangerouslySetInnerHTML={{ __html: props.html }} />
        </Column>
      </TwoColumns>
    </React.Fragment>
  );
};

import React from "react";
import { FormattedMessage } from "react-intl";
import GithubIcon from "../GithubIcon";
import { fileOnGithub, capitalize } from "../../utils";
import Breadcrumbs from "../Breadcrumbs";
import OptionsList from "../OptionsList";
import Column from "../Column";
import TwoColumns from "../TwoColumns";
import Tray from "../Tray";
import OptionsIcon from "@material-ui/icons/Tune";

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

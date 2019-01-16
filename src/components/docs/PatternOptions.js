import React from "react";
import { FormattedMessage } from "react-intl";
import GithubIcon from "../GithubIcon";
import { fileOnGithub, capitalize } from "../../utils";
import Breadcrumbs from "../Breadcrumbs";
import OptionsList from "../OptionsList";

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
            link: "/docs/patterns",
            label: "app.patterns"
          },
          {
            link: "/docs/patterns/" + props.pattern,
            label: capitalize(props.pattern)
          }
        ]}
      >
        {capitalize(props.pattern)} <FormattedMessage id="app.options" />
      </Breadcrumbs>
      <h1>
        {capitalize(props.pattern)} <FormattedMessage id="app.options" />
        &nbsp;&nbsp;
        <a href={fileOnGithub(props.fileAbsolutePath)}>
          <GithubIcon color={"#2979ff"} />
        </a>
      </h1>
      <OptionsList pattern={props.pattern} language={props.language} />
    </React.Fragment>
  );
};

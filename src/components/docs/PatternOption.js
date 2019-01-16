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
            link: "/docs/patterns",
            label: "app.patterns"
          },
          {
            link: "/docs/patterns/" + props.pattern,
            label: capitalize(props.pattern)
          },
          {
            link: "/docs/patterns/" + props.pattern + "/options",
            label: "app.patternOptions"
          }
        ]}
      >
        <FormattedMessage
          id={"options." + props.pattern + "." + props.option + ".title"}
        />
      </Breadcrumbs>
      <h1>
        <FormattedMessage
          id={"options." + props.pattern + "." + props.option + ".title"}
        />
        &nbsp;&nbsp;
        <a href={fileOnGithub(props.fileAbsolutePath)}>
          <GithubIcon color={"#2979ff"} />
        </a>
      </h1>
      <TwoColumns>
        <Column wide left>
          <article dangerouslySetInnerHTML={{ __html: props.html }} />
        </Column>
        <Column narrow right>
          <Tray
            className="mb1 stick"
            icon={<OptionsIcon />}
            title={
              <React.Fragment>
                <FormattedMessage id="app.patternOptions" />:{" "}
                {capitalize(props.pattern)}
              </React.Fragment>
            }
          >
            <OptionsList pattern={props.pattern} language={props.language} />
          </Tray>
        </Column>
      </TwoColumns>
    </React.Fragment>
  );
};

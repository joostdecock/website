import React from "react";
import { FormattedMessage } from "react-intl";
import GithubIcon from "../GithubIcon";
import { editLink, fileOnGithub } from "../../utils";
import Breadcrumbs from "../Breadcrumbs";
import SettingsList from "../SettingsList";
import Column from "../Column";
import TwoColumns from "../TwoColumns";
import Tray from "../Tray";
import SettingsIcon from "@material-ui/icons/Settings";
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
            link: "/docs/draft",
            label: "app.draft"
          },
          {
            link: "/docs/draft/settings",
            label: "app.draftSettings"
          }
        ]}
      >
        <FormattedMessage id={"settings." + props.setting + ".title"} />
      </Breadcrumbs>
      <h1>
        <FormattedMessage id={"settings." + props.setting + ".title"} />
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
        <Column narrow right>
          <Tray
            className="mb1 stick"
            icon={<SettingsIcon />}
            title=<FormattedMessage id="app.draftSettings" />
          >
            <SettingsList language={props.language} />
          </Tray>
        </Column>
      </TwoColumns>
    </React.Fragment>
  );
};

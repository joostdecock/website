import React from "react";
import Tray from "../../../Tray";
import MissingIcon from "@material-ui/icons/HighlightOff";
import LanguageIcon from "@material-ui/icons/Language";
import LinkIcon from "@material-ui/icons/Link";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import { Link } from "gatsby";
import { locLang } from "../../../../utils";
import GithubIcon from "../../../GithubIcon";

const Docs = props => {
  if (props.node === false) {
    let footer = (
      <Button href="https://github.com/freesewing/website/issues/new">
        <FormattedMessage id="app.reportThisOnGithub" />
      </Button>
    );
    return (
      <Tray
        icon={<MissingIcon />}
        title={<FormattedMessage id="app.docsNotFoundTitle" />}
        className="danger"
        footer={footer}
      >
        <p>
          <FormattedMessage id="app.docsNotFoundMsg" />
        </p>
        <p>
          <FormattedMessage id="app.weEncourageYouToReportThis" />
        </p>
      </Tray>
    );
  }
  let warning = "";
  if (props.language !== props.node.language)
    warning = (
      <Tray
        icon={<LanguageIcon />}
        title={
          <FormattedMessage id="app.thisContentIsNotAvailableInLanguage" />
        }
        className="warning"
      >
        <p>
          <FormattedMessage id="app.contentLocaleFallback" />
        </p>
      </Tray>
    );
  return [
    <h3>
      {props.node.frontmatter.title}
      <Link
        to={locLang.set(props.node.frontmatter.path, props.language)}
        className="ml1"
      >
        <LinkIcon />
      </Link>
    </h3>,
    <div dangerouslySetInnerHTML={{ __html: props.node.html }} />,
    warning
  ];
};

export default Docs;

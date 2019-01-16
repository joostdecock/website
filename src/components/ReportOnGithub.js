import React from "react";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import GithubIcon from "./GithubIcon";

const ReportOnGithub = props => {
  return (
    <Button
      variant="outlined"
      color="primary"
      href="https://github.com/freesewing/website/issues/new"
      target="_BLANK"
    >
      <GithubIcon className="mr05" />
      <FormattedMessage id="app.reportThisOnGithub" />
    </Button>
  );
};

export default ReportOnGithub;

import React from "react";
import Center from "../Center";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import GithubIcon from "../GithubIcon";
import Logo from "../Logo";
import { Link } from "gatsby";

const CommitResult = props => {
  return (
    <Center>
      <div className="maxw700">
        <h2>
          <FormattedMessage id="editor.thankYouForYourContribution" />
        </h2>
        <p>
          <FormattedMessage
            id="editor.changesAreSubmitted"
            values={{
              pr: (
                <a
                  href={props.pr.url}
                  target="_BLANK"
                  rel="noopener noreferrer"
                >
                  <FormattedMessage id="editor.pullRequest" /> #{props.pr.nr}
                </a>
              ),
              commit: (
                <a
                  href={props.commit}
                  target="_BLANK"
                  rel="noopener noreferrer"
                >
                  <FormattedMessage id="editor.yourChanges" />
                </a>
              )
            }}
          />
        </p>
        <p className="txt-center">
          <a href={props.pr.url} rel="noopener noreferrer" target="_BLANK">
            <Button color="primary" variant="outlined" className="mr05">
              <GithubIcon className="mr05" />
              <FormattedMessage id="editor.open" />
              &nbsp;
              <FormattedMessage id="editor.pullRequest" />
              &nbsp;#
              {props.pr.nr}
            </Button>
          </a>
          <Link to={props.backLink}>
            <Button color="primary" variant="contained">
              <Logo className="mr05" />
              <FormattedMessage id="editor.continueBrowsing" />
            </Button>
          </Link>
        </p>
      </div>
    </Center>
  );
};

export default CommitResult;

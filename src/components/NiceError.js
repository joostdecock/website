import React from "react";
import PropTypes from "prop-types";
import { camelCase } from "../utils";
import { FormattedMessage } from "react-intl";
import ReportOnGithub from "./ReportOnGithub";

const NiceError = props => {
  if (props.report !== undefined)
    return (
      <React.Fragment>
        <p>
          <FormattedMessage id={"errors." + camelCase(props.err.message)} />
        </p>
        <p>
          <ReportOnGithub />
        </p>
      </React.Fragment>
    );
  else
    return <FormattedMessage id={"errors." + camelCase(props.err.message)} />;
};

NiceError.propTypes = {
  err: PropTypes.object.isRequired
};

export default NiceError;

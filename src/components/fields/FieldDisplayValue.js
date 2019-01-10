import React from "react";
import PropTypes from "prop-types";
import { distance } from "../../utils";
import { FormattedMessage, FormattedRelative } from "react-intl";
import Avatar from "@material-ui/core/Avatar";

const FieldDisplayValue = props => {
  let { value, type, units } = props;
  if (typeof value === "undefined") return null;
  switch (type) {
    case "button":
      return null;
    case "distance":
      return (
        <span
          className="field-value"
          dangerouslySetInnerHTML={{ __html: distance.asHtml(value, units) }}
        />
      );
    case "radio":
      let label = false;
      for (let option of props.config.options) {
        if (option.value === value) label = option.label;
      }
      if (!label) return null;
      else
        return (
          <span className="field-value">
            <FormattedMessage id={label} />
          </span>
        );
    case "markdown":
      let id = "app.no";
      if (value.length > 3) id = "app.yes";
      return (
        <span className="field-value">
          <FormattedMessage id={id} />
        </span>
      );
    case "timestamp":
      return (
        <span className="field-value">
          <FormattedRelative value={value} />
        </span>
      );
    case "image":
      return <Avatar alt=":)" src={value} />;
    case "password":
      return (
        <span role="img" aria-label="hidden" className="field-value" alt="|-)">
          🙈
        </span>
      );
    case "patron":
      let str = "";
      if (value > 1) str = "app.patron-" + value;
      else str = "app.no";
      return (
        <span className="field-value">
          <FormattedMessage id={str} />
        </span>
      );
    default:
      return <span className="field-value">{value}</span>;
  }
};

FieldDisplayValue.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default FieldDisplayValue;

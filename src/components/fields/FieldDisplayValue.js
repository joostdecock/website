import React from "react";
import PropTypes from "prop-types";
import { distance } from "../../utils";
import { FormattedMessage } from "react-intl";

const FieldDisplayValue = props => {
  let { value, type, units } = props;
  if (typeof value === "undefined") return null;
  switch (type) {
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
    default:
      return <span className="field-value">{value}</span>;
  }
};

FieldDisplayValue.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired
};

export default FieldDisplayValue;

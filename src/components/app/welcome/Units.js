import React from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormattedMessage } from "react-intl";

function Units({ units, handleUnitsChange, intl }) {
  return (
    <div>
      <h5>
        <FormattedMessage id="account.unitsTitle" />
      </h5>
      <RadioGroup name="units" onChange={handleUnitsChange} value={units}>
        <FormControlLabel
          control={<Radio color="primary" />}
          value="metric"
          checked={units === "metric" ? true : false}
          label={intl.formatMessage({ id: "app.metricUnits" })}
        />
        <FormControlLabel
          control={<Radio color="primary" />}
          checked={units === "imperial" ? true : false}
          value="imperial"
          label={intl.formatMessage({ id: "app.imperialUnits" })}
        />
      </RadioGroup>
    </div>
  );
}

Units.propTypes = {
  units: PropTypes.oneOf(["metric", "imperial"]),
  handleUnitsChange: PropTypes.func
};

export default Units;

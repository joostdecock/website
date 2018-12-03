import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { locLang } from "../utils";
import { Link } from "gatsby";
import { injectIntl } from "react-intl";

const MeasurementsList = props => {
  // Sort measurements regardless of language
  const measurements = {};
  for (let m of props.measurements) {
    let label = props.intl.formatMessage({ id: "measurements." + m });
    measurements[label] = m;
  }
  return (
    <ul>
      {Object.keys(measurements)
        .sort()
        .map((label, index) => {
          let measurement = measurements[label];
          return (
            <li key={measurement}>
              <Link
                to={locLang.set(
                  "/docs/measurements/" + measurement.toLowerCase(),
                  props.language
                )}
              >
                <FormattedMessage id={"measurements." + measurement} />
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

MeasurementsList.propTypes = {
  measurements: PropTypes.array.isRequired,
  language: PropTypes.string.isRequired
};

export default injectIntl(MeasurementsList);

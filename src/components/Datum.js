import React from "react";
import PropTypes from "prop-types";
import { FormattedDate } from "react-intl";

// Date is a reserved word, that's why this is called Datum

const Datum = props => {
  let dateObject = new Date(
    props.date.substr(0, 4),
    props.date.substr(5, 2),
    props.date.substr(8, 2)
  );
  return (
    <FormattedDate
      value={dateObject}
      weekday="long"
      day="numeric"
      month="long"
      year="numeric"
    />
  );
};

Datum.propTypes = {
  date: PropTypes.string.isRequired
};

export default Datum;

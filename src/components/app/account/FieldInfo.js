import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";

const FieldInfo = ({ field }) => (
  <div className="box low">
    <h5>
      <FormattedMessage id={"account." + field} />
    </h5>
    <p>
      <FormattedHTMLMessage id={"account." + field + "Info"} />
    </p>
  </div>
);

FieldInfo.propTypes = {
  field: PropTypes.string.isRequired
};

export default FieldInfo;

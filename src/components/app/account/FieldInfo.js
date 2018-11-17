import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import Tray from "../../Tray";
import WhyIcon from "@material-ui/icons/Help";

const FieldInfo = props => (
  <Tray
    className="my1 always-expanded"
    icon={<WhyIcon />}
    title={<FormattedMessage id="app.whatIsThis" />}
  >
    <p>
      <FormattedHTMLMessage id={"account." + props.field + "Info"} />
    </p>
  </Tray>
);

FieldInfo.propTypes = {
  field: PropTypes.string.isRequired
};

export default FieldInfo;

import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import Tray from "../../Tray";
import TrayTitle from "../../TrayTitle";
import WhyIcon from "@material-ui/icons/Help";

const FieldInfo = props => (
  <Tray className="vspace2">
    <TrayTitle icon={<WhyIcon />}>
      <FormattedMessage id="app.whatIsThis" />
    </TrayTitle>
    <p>
      <FormattedHTMLMessage id={"account." + props.field + "Info"} />
    </p>
  </Tray>
);

FieldInfo.propTypes = {
  field: PropTypes.string.isRequired
};

export default FieldInfo;

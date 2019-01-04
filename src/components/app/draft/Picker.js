import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import OptionsIcon from "@material-ui/icons/Tune";
import SettingsIcon from "@material-ui/icons/Settings";
import SettingsPicker from "./SettingsPicker";
import Tray from "../../Tray";

const Picker = ({ titleId, childProps }) => (
  <Tray
    className="mb1"
    icon={titleId === "app.patternOptions" ? <OptionsIcon /> : <SettingsIcon />}
    title={<FormattedMessage id={titleId} />}
  >
    <div className="overpad2-always">
      <SettingsPicker {...childProps} />
    </div>
  </Tray>
);

Picker.propTypes = {
  titleId: PropTypes.string.isRequired,
  childProps: PropTypes.object.isRequired
};

export default Picker;

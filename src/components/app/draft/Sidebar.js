import React from "react";
import Tray from "../../Tray";
import { FormattedMessage } from "react-intl";
import SettingsPicker from "./SettingsPicker";
import OptionsIcon from "@material-ui/icons/Tune";
import SettingsIcon from "@material-ui/icons/Settings";
import { patternInfo } from "@freesewing/patterns";
import draftOptions from "../../../config/draftoptions";
import ActionIcon from "@material-ui/icons/Directions";
import Actions from "./actions/Container";

class Sidebar extends React.Component {
  state = {
    expandedTray: "options",
    expandedTitle: "",
    expandedSubtitle: "",
    expandedOption: ""
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log("oh shit", error, info);
  }

  render() {
    console.log("sidebar props", this.props);
    const sharedProps = {
      language: this.props.language,
      settings: this.props.settings,
      display: this.props.display,
      pattern: patternInfo[this.props.pattern],
      updateDisplay: this.props.methods.updateDisplay
    };
    return (
      <React-Fragment>
        <Tray
          className="mb1"
          icon={<OptionsIcon />}
          title={<FormattedMessage id="app.patternOptions" />}
        >
          <div className="overpad2-always">
            <SettingsPicker
              {...sharedProps}
              options={patternInfo[this.props.pattern].optionGroups}
              optionConfig={patternInfo[this.props.pattern].config.options}
              optionValues={this.props.settings.options}
              updateOption={this.props.methods.updateOption}
            />
          </div>
        </Tray>
        <Tray
          className="mb1"
          icon={<SettingsIcon />}
          title={<FormattedMessage id="app.draftSettings" />}
        >
          <div className="overpad2-always">
            <SettingsPicker
              {...sharedProps}
              options={draftOptions.groups}
              optionConfig={draftOptions.config}
              updateOption={this.props.methods.updateSetting}
              settings={this.props.settings}
              units={this.props.units}
            />
          </div>
        </Tray>
        <Tray
          className="mb1"
          icon={<ActionIcon />}
          title={<FormattedMessage id="app.actions" />}
        >
          <div className="overpad2-always">
            <Actions
              settings={this.props.settings}
              units={this.props.units}
              pattern={this.props.pattern}
              patternInfo={patternInfo}
              language={this.props.language}
              model={this.props.model}
              restoreDefaults={this.props.methods.restoreDefaults}
              saveDraft={this.props.methods.saveDraft}
              exportGist={this.props.methods.exportGist}
              exportDraft={this.props.methods.exportDraft}
            />
          </div>
        </Tray>
      </React-Fragment>
    );
  }
}

Sidebar.propTypes = {};

export default Sidebar;

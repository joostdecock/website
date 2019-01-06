import React from "react";
import Drawer from "../../Drawer";
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
    expandedDrawer: "options"
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log("oh shit", error, info);
  }

  toggleDrawer = drawer => {
    if (this.state.expandedDrawer === drawer) drawer = "";
    this.setState({ expandedDrawer: drawer });
  };

  render() {
    const sharedProps = {
      language: this.props.language,
      settings: this.props.settings,
      display: this.props.display,
      pattern: patternInfo[this.props.pattern],
      updateDisplay: this.props.methods.updateDisplay
    };
    return (
      <React-Fragment>
        <Drawer
          icon={<OptionsIcon />}
          title={<FormattedMessage id="app.patternOptions" />}
          toggleOpen={() => this.toggleDrawer("options")}
          open={this.state.expandedDrawer === "options" ? true : false}
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
        </Drawer>
        <Drawer
          icon={<SettingsIcon />}
          title={<FormattedMessage id="app.draftSettings" />}
          toggleOpen={() => this.toggleDrawer("settings")}
          open={this.state.expandedDrawer === "settings" ? true : false}
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
        </Drawer>
        <Drawer
          icon={<ActionIcon />}
          title={<FormattedMessage id="app.actions" />}
          toggleOpen={() => this.toggleDrawer("actions")}
          open={this.state.expandedDrawer === "actions" ? true : false}
        >
          <div className="overpad2-always">
            <Actions
              settings={this.props.settings}
              units={this.props.units}
              patron={this.props.patron}
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
        </Drawer>
      </React-Fragment>
    );
  }
}

Sidebar.propTypes = {};

export default Sidebar;

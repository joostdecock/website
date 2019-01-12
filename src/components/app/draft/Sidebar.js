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
    const language = this.props.language;
    const settings = this.props.gist.settings;
    const display = this.props.display;
    const pattern = patternInfo[this.props.gist.pattern];
    const sharedProps = {
      language,
      settings,
      display,
      pattern,
      updateDisplay: this.props.methods.updateDisplay
    };
    return (
      <React.Fragment>
        <Drawer
          icon={<OptionsIcon />}
          title={<FormattedMessage id="app.patternOptions" />}
          toggleOpen={() => this.toggleDrawer("options")}
          open={this.state.expandedDrawer === "options" ? true : false}
        >
          <div className="overpad2-always">
            <SettingsPicker
              {...sharedProps}
              options={pattern.optionGroups}
              optionConfig={pattern.config.options}
              optionValues={settings.options}
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
              settings={settings}
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
              gist={this.props.gist}
              language={language}
              pattern={pattern}
              units={this.props.units}
              patron={this.props.patron}
              patternInfo={patternInfo}
              saveDraft={this.props.methods.saveDraft}
              exportGist={this.props.methods.exportGist}
              exportDraft={this.props.methods.exportDraft}
              updateMeasurements={this.props.methods.updateMeasurements}
              clearGist={this.props.methods.clearGist}
              fromGist={this.props.fromGist}
            />
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {};

export default Sidebar;

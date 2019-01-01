import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Breadcrumbs from "../../Breadcrumbs";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import { patternInfo } from "@freesewing/patterns";
import DraftPreview from "../draft/DraftPreview";
import OptionDocs from "../draft/options/Docs";
import draftOptions from "../../../config/draftoptions";
import Picker from "../draft/Picker";
import PatternPicker from "./PatternPicker";
import { capitalize } from "../../../utils";
import models from "@freesewing/models";

class PlaygroundContainer extends React.Component {
  state = {
    pattern: this.props.pattern,
    units: "metric",
    settings: {
      embed: true,
      sa: 0,
      complete: true,
      options: {},
      paperless: false,
      locale: this.props.language,
      units: "metric",
      margin: 2
    },
    options: {},
    docs: false
  };

  showDocs = key => {
    this.setState({ docs: key });
  };

  updatePattern = pattern => {
    this.setState({ pattern });
  };

  updateOption = (key, val) => {
    let settings = this.state.settings;
    if (val === "true") val = true;
    else if (val === "false") val = false;
    settings.options[key] = val;
    this.setState({ settings, docs: false });
  };

  updateSetting = (key, val) => {
    if (val === "true") val = true;
    if (val === "false") val = false;
    let settings = this.state.settings;
    settings[key] = val;
    this.setState({ settings, docs: false });
  };

  optionDocsNode = key => {
    if (this.state.docs === false) return false;
    let nodePath =
      "/docs/patterns/" +
      this.state.pattern +
      "/options/" +
      this.state.docs.toLowerCase();
    if (typeof this.props.data.optionsHelp[nodePath] === "undefined")
      return false;
    else return this.props.data.optionsHelp[nodePath];
  };

  loadMeasurements = () => {
    return models.manSize42;
  };

  render() {
    let { language } = this.props;
    let { settings, docs, pattern, units } = this.state;
    let pickerProps = {
      language,
      settings,
      docs,
      pattern: patternInfo[pattern],
      showDocs: this.showDocs
    };
    return (
      <div>
        <Breadcrumbs>
          <FormattedMessage id="app.playground" />
        </Breadcrumbs>
        <h1>
          <FormattedMessage id="app.playground" />
          {this.state.pattern ? ": " + capitalize(this.state.pattern) : ""}
        </h1>
        <TwoColumns wrapReverse={true}>
          <Column wide>
            <div className="stick">
              {this.state.docs ? (
                <OptionDocs node={this.optionDocsNode()} language={language} />
              ) : this.state.pattern ? (
                <DraftPreview
                  pattern={pattern}
                  model="Example"
                  language={language}
                  settings={{
                    ...settings,
                    measurements: this.loadMeasurements()
                  }}
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.props.data.playgroundHelp["/docs/playground"]
                      .html
                  }}
                />
              )}
            </div>
          </Column>
          <Column right narrow>
            <PatternPicker
              updatePattern={this.updatePattern}
              selected={this.state.pattern}
            />
            {this.state.pattern ? (
              <div>
                <Picker
                  titleId="app.patternOptions"
                  childProps={{
                    ...pickerProps,
                    options: patternInfo[pattern].optionGroups,
                    optionConfig: patternInfo[pattern].config.options,
                    optionValues: settings.options,
                    updateOption: this.updateOption,
                    mode: "pattern"
                  }}
                />
                <Picker
                  titleId="app.draftOptions"
                  childProps={{
                    ...pickerProps,
                    options: draftOptions.groups,
                    optionConfig: draftOptions.config,
                    updateOption: this.updateSetting,
                    settings,
                    units,
                    mode: "draft"
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </Column>
        </TwoColumns>
      </div>
    );
  }
}

export default injectIntl(PlaygroundContainer);

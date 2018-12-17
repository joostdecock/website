import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Breadcrumbs from "../../Breadcrumbs";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import { patternInfo } from "@freesewing/patterns";
import { locLang, capitalize } from "../../../utils";
import DraftPreview from "./DraftPreview";
import OptionDocs from "./options/Docs";
import draftOptions from "../../../config/draftoptions";
import StartOver from "./StartOver";
import Picker from "./Picker";

class DraftContainer extends React.Component {
  state = {
    pattern: this.props.pattern,
    model: this.props.model,
    settings: {
      embed: true,
      sa: 0,
      complete: true,
      options: {},
      paperless: false,
      locale: this.props.language,
      units: this.props.user.settings.units,
      margin: this.props.user.settings.units === "imperial" ? 2.38125 : 2
    },
    options: {},
    docs: false
  };

  showDocs = key => {
    this.setState({ docs: key });
  };

  updateOption = (key, val) => {
    let settings = this.state.settings;
    settings.options[key] = val;
    this.setState({ settings, docs: false });
  };

  updateSetting = (key, val) => {
    console.log("updating", key, val);
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
  render() {
    let { language, pattern, model } = this.props;
    let { settings, docs } = this.state;
    let pickerProps = {
      language,
      settings,
      docs,
      pattern: patternInfo[pattern],
      showDocs: this.showDocs
    };
    return (
      <div>
        <Breadcrumbs
          via={[
            {
              label: (
                <FormattedMessage
                  id="app.draftPattern"
                  values={{ pattern: capitalize(this.props.pattern) }}
                />
              ),
              link: locLang.set("/draft/", language)
            },
            {
              label: (
                <FormattedMessage
                  id="app.draftPatternForModel"
                  values={{
                    pattern: capitalize(this.props.pattern),
                    model: this.props.model.name
                  }}
                />
              ),
              link: locLang.set("/draft/" + this.props.pattern, language)
            }
          ]}
        >
          <FormattedMessage id="app.configureYourDraft" />
        </Breadcrumbs>
        <h1>
          <FormattedMessage id="app.configureYourDraft" />
        </h1>
        <TwoColumns wrapReverse={true}>
          <Column wide>
            <div className="stick">
              {this.state.docs ? (
                <OptionDocs node={this.optionDocsNode()} language={language} />
              ) : (
                <DraftPreview
                  pattern={pattern}
                  model={model}
                  language={language}
                  settings={{
                    ...settings,
                    measurements: this.props.model.measurements
                  }}
                />
              )}
            </div>
          </Column>
          <Column right narrow>
            <div className="stick">
              <Picker
                titleId="app.patternOptions"
                childProps={{
                  ...pickerProps,
                  options: patternInfo[pattern].optionGroups,
                  optionConfig: patternInfo[pattern].config.options,
                  optionValues: settings.options,
                  updateOption: this.updateOption
                }}
              />
              <Picker
                titleId="app.draftOptions"
                childProps={{
                  ...pickerProps,
                  options: draftOptions.groups,
                  optionConfig: draftOptions.config,
                  updateOption: this.updateSetting,
                  settings: this.state.settings,
                  units: this.props.user.settings.units
                }}
              />
              <StartOver
                pattern={this.props.pattern}
                language={this.props.language}
              />
            </div>
          </Column>
        </TwoColumns>
      </div>
    );
  }
}

export default injectIntl(DraftContainer);

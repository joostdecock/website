import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Breadcrumbs from "../../Breadcrumbs";
import TwoColumns from "../../TwoColumns";
import Center from "../../Center";
import Column from "../../Column";
import { patternInfo } from "@freesewing/patterns";
import { locLang, capitalize } from "../../../utils";
import DraftPreview from "./DraftPreview";
import OptionDocs from "./options/Docs";
import draftOptions from "../../../config/draftoptions";
import Picker from "./Picker";
import Actions from "./actions/Container";
import Gist from "./Gist";
import Export from "./Export";
import Spinner from "../../Spinner";

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
    show: "draft",
    docs: false,
    gist: false,
    format: ""
  };

  showDocs = key => {
    if (key === false) this.setState({ show: "draft", docs: false });
    else this.setState({ show: "docs", docs: key });
  };

  updateOption = (key, val) => {
    let settings = this.state.settings;
    if (val === "true") val = true;
    else if (val === "false") val = false;
    settings.options[key] = val;
    this.setState({ settings, show: "draft" });
  };

  updateSetting = (key, val) => {
    if (val === "true") val = true;
    if (val === "false") val = false;
    let settings = this.state.settings;
    settings[key] = val;
    this.setState({ settings, show: "draft" });
  };

  restoreDefaults = () => {
    this.setState({
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
      show: "draft"
    });
  };

  getDraftGist = () => {
    let gist = {};
    gist.pattern = this.state.pattern;
    gist.settings = this.state.settings;
    delete gist.settings.embed;
    gist.settings.options = this.state.options;
    gist.settings.measurements = this.props.model.measurements;

    return gist;
  };

  exportGist = format => {
    this.setState({ gist: this.getDraftGist(), show: "gist", format });
  };

  saveDraft = () => {};

  exportDraft = format => {
    this.setState({ gist: this.getDraftGist(), show: "export", format });
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
    let breadcrumbs = (
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
    );
    const title = (
      <h1>
        <FormattedMessage id="app.configureYourDraft" />
      </h1>
    );

    let main = "";
    if (this.state.show === "docs")
      main = <OptionDocs node={this.optionDocsNode()} language={language} />;
    else if (this.state.show === "gist")
      main = <Gist gist={this.state.gist} format={this.state.format} />;
    else if (this.state.show === "export")
      main = <Export gist={this.state.gist} format={this.state.format} />;
    else if (this.state.show === "draft") {
      if (typeof this.props.model === "srting")
        main = <p>FIXME: Waiting for model - show loader here</p>;
      else
        main = (
          <DraftPreview
            pattern={pattern}
            model={model}
            language={language}
            settings={{
              ...settings,
              measurements: this.props.model.measurements
            }}
          />
        );
    }
    return (
      <div>
        {breadcrumbs}
        <TwoColumns wrapReverse={true}>
          <Column wide>
            <div className="stick">{main}</div>
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
                titleId="app.draftSettings"
                childProps={{
                  ...pickerProps,
                  options: draftOptions.groups,
                  optionConfig: draftOptions.config,
                  updateOption: this.updateSetting,
                  settings: this.state.settings,
                  units: this.props.user.settings.units
                }}
              />
              <Actions
                settings={this.state.settings}
                units={this.props.user.settings.units}
                pattern={pattern}
                patternInfo={patternInfo}
                language={this.props.language}
                model={this.props.model}
                restoreDefaults={this.restoreDefaults}
                saveDraft={this.saveDraft}
                exportGist={this.exportGist}
                exportDraft={this.exportDraft}
              />
            </div>
          </Column>
        </TwoColumns>
      </div>
    );
  }
}

export default injectIntl(DraftContainer);

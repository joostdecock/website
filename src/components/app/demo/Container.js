import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Breadcrumbs from "../../Breadcrumbs";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import Drawers from "../../Drawers";
import DraftPreview from "../draft/DraftPreview";
import OptionDocs from "../draft/options/Docs";
import draftSettings from "../../../config/draftsettings";
import PatternPicker from "./PatternPicker";
import { capitalize } from "../../../utils";
import models from "@freesewing/models";
import StarIcon from "@material-ui/icons/Star";
import OptionsIcon from "@material-ui/icons/Tune";
import SettingsIcon from "@material-ui/icons/Settings";
import SettingsPicker from "../draft/SettingsPicker";
import Markdown from "react-markdown";

class DemoContainer extends React.Component {
  state = {
    pattern: this.props.pattern || false,
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
    docs: false,
    display: "intro"
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
    if (Object.keys(draftSettings.config).indexOf(key) === -1)
      settings.options[key] = val;
    else settings[key] = val;
    this.setState({ settings, docs: false });
  };

  optionDocsNode = key => {
    if (this.state.docs === false) return false;
    let nodePath =
      "/docs/patterns/" +
      this.props.pattern +
      "/options/" +
      this.state.docs.toLowerCase();
    if (typeof this.props.data.optionsHelp[nodePath] === "undefined")
      return false;
    else return this.props.data.optionsHelp[nodePath];
  };

  loadMeasurements = () => {
    return models.manSize42;
  };

  updateDisplay = display => {
    this.setState({ display });
  };

  render() {
    let drawers = {
      pattern: {
        config: {
          title: "app.chooseAPattern",
          icon: <StarIcon />
        },
        content: (
          <PatternPicker
            updatePattern={this.updatePattern}
            selected={this.props.pattern}
            language={this.props.language}
          />
        )
      }
    };

    let via = [];
    let gist = false;
    if (this.props.pattern) {
      gist = {
        pattern: this.props.pattern,
        settings: {
          ...this.state.settings,
          measurements: this.loadMeasurements()
        }
      };
      let pickerProps = {
        language: this.props.language,
        gist,
        display: this.state.display,
        units: "metric",
        methods: {
          updateDisplay: this.updateDisplay,
          updateOption: this.updateOption
        }
      };
      drawers.pattern.config.title = (
        <FormattedMessage
          id="app.draftPattern"
          values={{ pattern: capitalize(this.props.pattern) }}
        />
      );
      drawers.pattern.config.icon = <StarIcon className="color-success" />;
      via.push({
        link: "/" + this.props.language + "/demo",
        label: "app.demo"
      });
      drawers.options = {
        config: {
          title: "app.patternOptions",
          icon: <OptionsIcon />
        },
        content: (
          <div className="overpad2-always">
            <SettingsPicker {...pickerProps} mode="pattern" />
          </div>
        )
      };
      drawers.settings = {
        config: {
          title: "app.draftSettings",
          icon: <SettingsIcon />
        },
        content: (
          <div className="overpad2-always">
            <SettingsPicker {...pickerProps} mode="draft" />
          </div>
        )
      };
    }

    let main;
    if (this.props.pattern) {
      if (this.state.display === "docs")
        main = (
          <OptionDocs
            node={this.optionDocsNode()}
            language={this.props.language}
          />
        );
      else {
        let gist = {
          pattern: this.props.pattern,
          settings: {
            ...this.state.settings,
            measurements: this.loadMeasurements()
          }
        };
        main = <DraftPreview gist={gist} />;
      }
    } else
      main = (
        <Markdown
          source={this.props.data.demoHelp["/docs/demo"].rawMarkdownBody}
        />
      );
    return (
      <div>
        <Breadcrumbs via={via}>
          <FormattedMessage
            id={
              this.props.pattern ? capitalize(this.props.pattern) : "app.demo"
            }
          />
        </Breadcrumbs>
        <h1>
          <FormattedMessage id="app.demo" />
          {this.props.pattern ? ": " + capitalize(this.props.pattern) : ""}
        </h1>
        <TwoColumns wrapReverse={true}>
          <Column wide>
            <div className="stick">{main}</div>
          </Column>
          <Column right narrow>
            <Drawers drawers={drawers} />
          </Column>
        </TwoColumns>
      </div>
    );
  }
}

export default injectIntl(DemoContainer);

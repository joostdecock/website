import React from "react";
import { connect } from "react-redux";
import { showNotification } from "../../../store/actions/notification";
import { setDrafts } from "../../../store/actions/drafts";
import { FormattedMessage, injectIntl } from "react-intl";
import Breadcrumbs from "../../Breadcrumbs";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import Center from "../../Center";
import Spinner from "../../Spinner";
import { locLang, capitalize } from "../../../utils";
import DraftPreview from "./DraftPreview";
import OptionDocs from "./options/Docs";
import Gist from "./Gist";
import Export from "./Export";
import Sidebar from "./Sidebar";
import backend from "../../../backend";
import { navigate } from "gatsby";

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
    display: "draft",
    docs: false,
    gist: false,
    format: ""
  };

  updateDisplay = (key, data = null) => {
    switch (key) {
      case "spinner":
        this.setState({ display: "spinner" });
        break;
      case "docs":
        this.setState({ display: "docs", docs: key });
        break;
      default:
        this.setState({ display: "draft" });
    }
  };

  updateOption = (key, val) => {
    let settings = this.state.settings;
    if (val === "true") val = true;
    else if (val === "false") val = false;
    settings.options[key] = val;
    this.setState({ settings, display: "draft" });
  };

  updateSetting = (key, val) => {
    if (val === "true") val = true;
    if (val === "false") val = false;
    let settings = this.state.settings;
    settings[key] = val;
    this.setState({ settings, display: "draft" });
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
      display: "draft"
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
    this.setState({ gist: this.getDraftGist(), display: "gist", format });
  };

  saveDraft = () => {
    backend
      .createDraft({ gist: this.getDraftGist() })
      .then(res => {
        if (res.status === 200) {
          this.props.setDrafts(res.data.drafts);
          this.props.showNotification(
            "success",
            this.props.intl.formatMessage(
              { id: "app.fieldSaved" },
              { field: this.props.intl.formatMessage({ id: "app.draft" }) }
            )
          );
          navigate(
            locLang.set("/drafts/" + res.data.handle, this.props.language)
          );
        }
      })
      .catch(err => {
        console.log("nope", err);
        this.props.showNotification("error", err);
        return false;
      });
  };

  exportDraft = format => {
    this.setState({ gist: this.getDraftGist(), display: "export", format });
  };

  optionDocsNode = key => {
    if (this.state.display !== "docs") return false;
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
    let { settings, display } = this.state;
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

    let main = "";
    if (this.state.display === "docs")
      main = <OptionDocs node={this.optionDocsNode()} language={language} />;
    else if (this.state.display === "spinner")
      main = (
        <Center>
          <Spinner />
        </Center>
      );
    else if (this.state.display === "gist")
      main = <Gist gist={this.state.gist} format={this.state.format} />;
    else if (this.state.display === "export")
      main = (
        <Export
          gist={this.state.gist}
          format={this.state.format}
          patron={this.props.user.patron || 0}
        />
      );
    else if (this.state.display === "draft") {
      if (typeof this.props.model === "string")
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
        <h1>
          <FormattedMessage id="app.configureYourDraft" />
        </h1>
        <TwoColumns wrapReverse={true}>
          <Column wide>
            <div className="stick">{main}</div>
          </Column>
          <Column right narrow>
            <div className="stick">
              <Sidebar
                language={language}
                settings={settings}
                units={this.props.user.settings.units}
                pattern={pattern}
                model={this.props.model}
                display={display}
                methods={{
                  saveDraft: this.saveDraft,
                  exportGist: this.exportGist,
                  exportDraft: this.exportDraft,
                  updateDisplay: this.updateDisplay,
                  updateOption: this.updateOption,
                  updateSetting: this.updateSetting,
                  restoreDefaults: this.restoreDefaults
                }}
              />
            </div>
          </Column>
        </TwoColumns>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setDrafts: drafts => dispatch(setDrafts(drafts)),
  showNotification: (style, message) =>
    dispatch(showNotification(style, message))
});

export default connect(
  null,
  mapDispatchToProps
)(injectIntl(DraftContainer));

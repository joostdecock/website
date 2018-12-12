import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";
import Breadcrumbs from "../../Breadcrumbs";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import PatternPicker from "./PatternPicker";
import ModelPicker from "./ModelPicker";
import OptionPicker from "./OptionPicker";
import { patternList, patternInfo } from "@freesewing/patterns";
import { tshirt } from "../../../data/icons";
import Icon from "../../Icon";
import ModelIcon from "@material-ui/icons/PermIdentity";
import TuneIcon from "@material-ui/icons/Tune";
import Tray from "../../Tray";
import { round, locLang, capitalize } from "../../../utils";
import DraftPreview from "./DraftPreview";
import TrayFooter from "../../TrayFooter";
import GithubIcon from "../../GithubIcon";

function PatternIcon() {
  return <Icon pathString={tshirt} className="r1" />;
}

class DraftContainer extends React.Component {
  state = {
    activeStep: 0,
    pattern: null,
    model: null,
    error: false,
    settings: {}
  };

  componentDidCatch(error, info) {
    console.log("Caught error", error, info);
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidMount() {
    let nakedPath = locLang.strip(this.props.location);
    let chunks = nakedPath.split("/");
    let pattern = chunks[2];
    let model = chunks[4];
    if (nakedPath === "/draft/" || nakedPath === "/draft") {
      this.setState({ activeStep: 0 });
    } else if (chunks.length < 5) {
      this.setState({
        activeStep: 1,
        pattern
      });
    } else if (chunks.length > 4) {
      this.setState({
        activeStep: 2,
        pattern,
        model,
        settings: {
          embed: true,
          sa: 10,
          measurements: this.props.models[model].measurements,
          options: {}
        }
      });
    }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({ activeStep: 0 });
  };

  setPattern = evt => {
    let value = evt.target.value;
    this.setState({ pattern: value });
  };

  setModel = evt => {
    let value = evt.target.value;
    this.setState({ model: value });
  };

  updateSettings = (key, val) => {
    let settings = this.state.settings;
    settings[key] = val;
    this.setState({ settings });
  };

  updateOption = (key, val) => {
    let settings = this.state.settings;
    settings.options[key] = val;
    this.setState({ settings });
  };

  resetOption = key => {
    let settings = this.state.settings;
    delete settings.options[key];
    this.setState({ settings });
  };

  getModelList = pattern => {
    let modelList = {};
    for (let handle of Object.keys(this.props.models))
      modelList[handle] = this.props.models[handle].name || handle;

    return modelList;
  };

  render() {
    const via = [];
    let title;
    const steps = [
      {
        title: (
          <h2>
            <FormattedMessage id="app.chooseAPattern" />
          </h2>
        )
      },
      {
        title: (
          <h2>
            <FormattedMessage id="app.chooseAModel" />
          </h2>
        ),
        list: this.getModelList(this.state.pattern)
      },
      {
        title: (
          <h2>
            <FormattedMessage id="app.configureYourDraft" />
          </h2>
        )
      }
    ];
    switch (this.state.activeStep) {
      case 2:
        let model;
        if (typeof this.props.models[this.state.model] === "undefined")
          model = "pending";
        else
          model = this.props.models[this.state.model].name || this.state.model;
        let pattern;
        if (typeof this.state.pattern === "undefined") pattern = "pending";
        else pattern = this.state.pattern;
        title = (
          <FormattedMessage
            id="app.draftPatternForModel"
            values={{
              pattern: capitalize(pattern),
              model
            }}
          />
        );
        via.push({
          label: "app.newDraft",
          link: locLang.set("/draft/", this.props.language)
        });
        via.push({
          label: (
            <FormattedMessage
              id="app.draftPattern"
              values={{ pattern: capitalize(pattern) }}
            />
          ),
          link: locLang.set("/draft/" + pattern, this.props.language)
        });
        steps[0].title = (
          <Button
            variant="outlined"
            fullWidth={true}
            href={locLang.set("/draft/", this.props.language)}
          >
            <FormattedMessage id="app.pattern" />: {capitalize(pattern)}
          </Button>
        );
        steps[1].title = (
          <Button
            variant="outlined"
            fullWidth={true}
            href={locLang.set("/draft/" + pattern, this.props.language)}
          >
            <FormattedMessage id="app.model" />: {capitalize(model)}
          </Button>
        );
        steps[0].classes = "emi-transparent";
        steps[1].classes = "emi-transparent";
        steps[2].classes = "";

        break;
      case 1:
        if (typeof this.state.pattern === "undefined") pattern = "pending";
        else pattern = this.state.pattern;
        via.push({
          label: "app.newDraft",
          link: locLang.set("/draft/", this.props.language)
        });
        title = <FormattedMessage id="app.draftPattern" values={{ pattern }} />;
        steps[0].title = (
          <Button
            variant="outlined"
            fullWidth={true}
            href={locLang.set("/draft/", this.props.language)}
          >
            <FormattedMessage id="app.pattern" />: {capitalize(pattern)}
          </Button>
        );
        steps[2].title = (
          <h5>
            <FormattedMessage id="app.configureYourDraft" />
          </h5>
        );
        steps[0].classes = "emi-transparent";
        steps[1].classes = "";
        break;
      default:
        title = <FormattedMessage id="app.newDraft" />;
        steps[1].title = (
          <h5>
            <FormattedMessage id="app.chooseAModel" />
          </h5>
        );
        steps[2].title = (
          <h5>
            <FormattedMessage id="app.configureYourDraft" />
          </h5>
        );
    }
    return (
      <div>
        <Breadcrumbs via={via}>{title}</Breadcrumbs>
        <h1>{title}</h1>
        <TwoColumns>
          <Column wide>
            {this.state.error ? (
              <Tray
                className="danger"
                title={<FormattedMessage id="app.weEncounteredAProblem" />}
              >
                <p>
                  <FormattedMessage id="app.weEncourageYouToReportThis" />
                  {". "}
                  <FormattedMessage id="app.pleaseIncludeTheInformationBelow" />
                  {":"}
                </p>
                <pre>
                  Error: {this.state.error}
                  {"\n\n"}
                  Pattern: {this.props.pattern}
                  {"\n\n"}
                  Settings:{" "}
                  {JSON.stringify(this.state.pattern.settings, null, 2)}
                </pre>
                <TrayFooter>
                  <Button
                    variant="outlined"
                    color="primary"
                    href="https://github.com/freesewing/website/issues/new"
                    rel="noopener noreferral"
                  >
                    <GithubIcon className="mr1" />
                    <FormattedMessage id="app.reportThisOnGitHub" />
                  </Button>
                </TrayFooter>
              </Tray>
            ) : (
              <Stepper
                activeStep={this.state.activeStep}
                orientation="vertical"
                classes={{ root: "nobg" }}
                connector={<br />}
              >
                <Step className={steps[0].classes}>
                  <StepLabel icon={<PatternIcon />}>{steps[0].title}</StepLabel>
                  <StepContent>
                    <div className="overpad1-always">
                      <PatternPicker
                        patterns={patternList}
                        language={this.props.language}
                      />
                    </div>
                  </StepContent>
                </Step>
                <Step className={steps[1].classes}>
                  <StepLabel icon={<ModelIcon />}>{steps[1].title}</StepLabel>
                  <StepContent>
                    <div className="overpad1-always">
                      <ModelPicker
                        models={steps[1].list}
                        pattern={this.state.pattern}
                        language={this.props.language}
                      />
                    </div>
                  </StepContent>
                </Step>
                <Step className={steps[2].classes}>
                  <StepLabel icon={<TuneIcon />}>{steps[2].title}</StepLabel>
                  <StepContent />
                </Step>
              </Stepper>
            )}
          </Column>
        </TwoColumns>
        <TwoColumns wrapReverse={true}>
          <Column wide>
            {this.state.activeStep === 2 ? (
              <DraftPreview
                pattern={this.state.pattern}
                model={this.props.models[this.state.model]}
                language={this.props.language}
                settings={this.state.settings}
              />
            ) : (
              ""
            )}
          </Column>
          <Column right narrow>
            {this.state.activeStep === 2 ? (
              <Tray
                className="force-xpanded stick mb1"
                icon={<TuneIcon />}
                title={<FormattedMessage id="app.options" />}
              >
                <div className="overpad2-always">
                  <OptionPicker
                    pattern={patternInfo[this.state.pattern]}
                    language={this.props.language}
                    settings={this.state.settings}
                    updateOption={this.updateOption}
                    resetOption={this.resetOption}
                  />
                </div>
              </Tray>
            ) : (
              ""
            )}
          </Column>
        </TwoColumns>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  models: state.models
});

const mapDispatchToProps = dispatch => ({
  showNotification: (style, message) =>
    dispatch(showNotification(style, message)),
  closeNotification: () => dispatch(closeNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(DraftContainer));

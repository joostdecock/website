import React from "react";
import PropTypes from "prop-types";
import Tray from "../../Tray";
import TrayFooter from "../../TrayFooter";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import GithubIcon from "../../GithubIcon";
import { capitalize } from "../../../utils";
import { patterns } from "@freesewing/patterns";
import svgattrPlugin from "@freesewing/plugin-svgattr";
//import i18nPlugin from "@freesewing/plugin-i18n";
//import validatePlugin from "@freesewing/plugin-validate";
//import debugPlugin from "@freesewing/plugin-debug";

class DraftPreview extends React.Component {
  state = {
    svg: false,
    pattern: false
  };

  componentDidMount() {
    const pattern = new patterns[(capitalize(this.props.pattern))]({
      foo: "barbie",
      sa: 10,
      embed: true,
      rubo: 2,
      measurements: {
        bicepsCircumference: 335,
        centerBackNeckToWaist: 520,
        chestCircumference: 1080,
        naturalWaistToHip: 145,
        neckCircumference: 420,
        shoulderSlope: 55,
        shoulderToShoulder: 465,
        shoulderToWrist: 680,
        wristCircumference: 190,
        hipsCircumference: 990
      }
    }).with(svgattrPlugin, { class: "fs-draft preview" });

    pattern.draft();
    this.setState({
      pattern: pattern
    });
  }

  render() {
    let svg = false;
    let error = false;
    try {
      svg = this.state.pattern.draft().render();
    } catch (err) {
      error = err;
    }
    if (error)
      return (
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
            Error: {JSON.stringify(error, null, 2)}
            {"\n\n"}
            Pattern: {this.props.pattern}
            {"\n\n"}
            Settings: {JSON.stringify(this.state.pattern.settings, null, 2)}
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
      );
    else
      return (
        <div
          className="freesewing draft svg w100"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      );
  }
}

DraftPreview.propTypes = {
  pattern: PropTypes.string.isRequired,
  model: PropTypes.object.isRequired
};

export default DraftPreview;

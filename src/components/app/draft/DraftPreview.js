import React from "react";
import PropTypes from "prop-types";
import Tray from "../../Tray";
import TrayFooter from "../../TrayFooter";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import GithubIcon from "../../GithubIcon";
import { capitalize } from "../../../utils";
import freesewing from "freesewing";
import { patterns } from "@freesewing/patterns";
import svgattrPlugin from "@freesewing/plugin-svgattr";
import i18nPlugin from "@freesewing/plugin-i18n";
import { plugin as patternTranslations } from "@freesewing/i18n";

class DraftPreview extends React.Component {
  state = {
    svg: false,
    pattern: false,
    hasError: false
  };

  render() {
    let error = false;
    if (
      typeof this.props.gist === "undefined" ||
      typeof this.props.gist.pattern === "undefined"
    )
      return <p>No gist</p>;
    const pattern = new patterns[(capitalize(this.props.gist.pattern))](
      this.props.gist.settings
    )
      .use(svgattrPlugin, { class: "freesewing draft" })
      .use(i18nPlugin, { strings: patternTranslations });
    try {
      switch (this.props.action) {
        case "sampleOption":
          pattern.sampleOption(this.props.option);
          break;
        case "sampleMeasurement":
          pattern.sampleMeasurement(this.props.measurement);
          break;
        case "sampleModels":
          console.log(this.props);
          if (this.props.focus)
            pattern.sampleModels(this.props.models, this.props.focus);
          else pattern.sampleModels(this.props.models);
          break;
        default:
          pattern.draft();
      }
    } catch (err) {
      console.log(err, pattern);
      error = err;
    }
    if (!error) {
      return (
        <div
          className="freesewing draft svg w100"
          dangerouslySetInnerHTML={{ __html: pattern.render() }}
        />
      );
    } else
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
          <pre>{JSON.stringify(this.props.gist, null, 2)}</pre>
          <TrayFooter>
            <Button
              variant="outlined"
              color="primary"
              href="https://github.com/freesewing/website/issues/new"
              rel="noopener noreferral"
            >
              <GithubIcon className="mr1" />
              <FormattedMessage id="app.reportThisOnGithub" />
            </Button>
          </TrayFooter>
        </Tray>
      );
  }
}

DraftPreview.propTypes = {
  gist: PropTypes.object.isRequired
};

DraftPreview.defaultProps = {
  action: "draft"
};

export default DraftPreview;

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TrayFooter from "../../TrayFooter";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import fileSaver from "file-saver";
import YAML from "yaml";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";
import i18nPlugin from "@freesewing/plugin-i18n";
import themePlugin from "@freesewing/plugin-theme";
import { plugin as patternTranslations } from "@freesewing/i18n";
import { patterns } from "@freesewing/patterns";
import { capitalize } from "../../../utils";
import prism from "prismjs";
import Center from "../../Center";
import Spinner from "../../Spinner";
import backend from "../../../backend";
import BecomeAPatron from "../../patrons/BecomeAPatron";

class Export extends React.Component {
  state = {
    loading: true,
    svg: false
  };

  componentDidMount() {
    const svg = this.renderDraft();
    if (this.props.format === "PDF") this.svgToPdf(svg, this.props.format);
    this.setState({ loading: false, svg });
  }

  svgToClipboard = () => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("svg"));
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand("copy");
      selection.removeAllRanges();
      this.props.showNotification(
        "success",
        <FormattedMessage id="app.copiedToClipboard" />
      );
    } catch (err) {
      console.log("error", err);
      this.props.showNotification("error", err);
    }
  };

  svgToFile = () => {
    const blob = new Blob([this.state.svg], {
      type: "image/svg+xml;charset=utf-8"
    });
    fileSaver.saveAs(blob, "draft.svg");
  };

  svgToPdf(svg, format) {
    backend
      .tiler(svg, format)
      .then(res => {
        if (res.status === 200) {
          let blob = new Blob([res.data], { type: "application/pdf" });
          fileSaver.saveAs(blob, "draft.pdf");
        }
      })
      .catch(err => {
        console.log("nope", err);
        this.props.showNotification("error", err);
        return false;
      });
  }

  renderDraft = () => {
    const pattern = new patterns[(capitalize(this.props.gist.pattern))](
      this.props.gist.settings
    ).use(i18nPlugin, { strings: patternTranslations });
    try {
      pattern.draft();
    } catch (err) {
      console.log(err, pattern);
      this.state.error = err;
    }
    return pattern.render();
  };

  render() {
    if (this.props.format === "PDF") {
      if (this.state.loading)
        return (
          <Center>
            <Spinner size={200} />
          </Center>
        );
      else {
        if (
          typeof this.props.user.patron !== "undefined" &&
          this.props.user.patron > 10
        )
          return (
            <Center>
              <h2 className="txt-center">All done patron!</h2>
            </Center>
          );
        else
          return (
            <React-Fragment>
              <blockquote>
                <h5>
                  <FormattedMessage id="app.becomeAPatron" />
                </h5>
                <p>
                  <FormattedMessage id="app.patronsKeepUsAfloat" />
                </p>
                <p>
                  <FormattedMessage id="app.patronPitch" />
                </p>
              </blockquote>
              <BecomeAPatron language={this.props.language} />
            </React-Fragment>
          );
      }
    } else {
      return (
        <div className="gist">
          <div className="gist-header">
            <Button color="secondary" onClick={this.svgToClipboard}>
              <FormattedMessage id="app.copy" />
            </Button>
            <Button color="secondary" onClick={this.svgToFile}>
              <FormattedMessage id="app.save" />
            </Button>
            <div className="filename">
              draft.
              {this.props.format.toLowerCase()}
            </div>
          </div>
          <div
            className="code"
            dangerouslySetInnerHTML={{
              __html: prism.highlight(
                this.state.svg,
                prism.languages.svg,
                "svg"
              )
            }}
          />
          <div className="hidden" id="svg">
            {this.state.svg}
          </div>
        </div>
      );
    }
  }
}

Export.propTypes = {
  gist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  showNotification: (style, message) =>
    dispatch(showNotification(style, message)),
  closeNotification: () => dispatch(closeNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Export);

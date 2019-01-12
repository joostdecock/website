import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import fileSaver from "file-saver";
import YAML from "yaml";
import {
  showNotification,
  closeNotification
} from "../store/actions/notification";
import prism from "prismjs";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Buttonbar from "./Buttonbar";

class Gist extends React.Component {
  state = {
    format: "yaml"
  };

  toggleFormat = () => {
    let format = "yaml";
    if (this.state.format === "yaml") format = "json";
    this.setState({ format });
  };

  gistToClipboard = () => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("gist"));
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand("copy");
      selection.removeAllRanges();
      this.props.showNotification(
        "success",
        <FormattedMessage id="app.copiedToClipboard" key="message" />
      );
    } catch (e) {
      this.props.showNotification("error", e);
    }
  };

  gistToFile = () => {
    let gist, type;
    if (this.state.format === "json") {
      gist = JSON.stringify(this.props.gist, null, 2);
      type = "application/json;charset=utf-8";
    } else {
      gist = YAML.stringify(this.props.gist);
      type = "text/x-yaml;charset=utf-8";
    }
    const blob = new Blob([gist], { type });
    fileSaver.saveAs(blob, "gist." + this.state.format);
  };

  render() {
    let code = "";
    if (this.state.format === "json")
      code = JSON.stringify(this.props.gist, null, 2);
    else code = YAML.stringify(this.props.gist);

    return (
      <React.Fragment>
        <Buttonbar reverse className="mb05">
          <Button color="primary" onClick={this.gistToClipboard}>
            <FormattedMessage id="app.copy" />
          </Button>
          <Button color="primary" onClick={this.gistToFile}>
            <FormattedMessage id="app.save" />
          </Button>
          <div className="toggle-container">
            <ToggleButtonGroup exlusive onChange={this.toggleFormat}>
              <ToggleButton
                className={
                  this.state.format === "json" ? "toggle selected" : "toggle"
                }
                value="json"
                selected={this.state.format === "json" ? true : false}
              >
                JSON
              </ToggleButton>
              <ToggleButton
                className={
                  this.state.format === "yaml" ? "toggle selected" : "toggle"
                }
                selected={this.state.format === "yaml" ? true : false}
              >
                YAML
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Buttonbar>
        <div className="gist">
          <div
            className="code"
            dangerouslySetInnerHTML={{
              __html: prism.highlight(code, prism.languages.js, "js")
            }}
          />
          <div className="hidden" id="gist">
            {code}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Gist.propTypes = {
  gist: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  showNotification: (style, message) =>
    dispatch(showNotification(style, message)),
  closeNotification: () => dispatch(closeNotification())
});

export default connect(
  null,
  mapDispatchToProps
)(Gist);

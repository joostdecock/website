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
import prism from "prismjs";

const Gist = props => {
  const gistToClipboard = () => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("gist"));
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand("copy");
      selection.removeAllRanges();
      props.showNotification(
        "success",
        <FormattedMessage id="app.copiedToClipboard" />
      );
    } catch (e) {
      props.showNotification("error", e);
    }
  };

  const gistToFile = () => {
    let gist, type;
    if (props.format === "json") {
      gist = JSON.stringify(props.gist, null, 2);
      type = "application/json;charset=utf-8";
    } else {
      gist = YAML.stringify(props.gist);
      type = "text/x-yaml;charset=utf-8";
    }
    const blob = new Blob([gist], { type });
    fileSaver.saveAs(blob, "gist." + props.format);
  };

  let code = "";
  if (props.format === "json") code = JSON.stringify(props.gist, null, 2);
  else code = YAML.stringify(props.gist);

  return (
    <div className="gist">
      <div className="gist-header">
        <Button color="secondary" onClick={gistToClipboard}>
          <FormattedMessage id="app.copy" />
        </Button>
        <Button color="secondary" onClick={gistToFile}>
          <FormattedMessage id="app.save" />
        </Button>
        <div className="filename">
          gist.
          {props.format}
        </div>
      </div>
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
  );
};

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

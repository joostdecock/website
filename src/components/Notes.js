import React from "react";
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
import remark from "remark";
import html from "remark-html";
import Tray from "./Tray";
import NotesIcon from "@material-ui/icons/Note";

class Gist extends React.Component {
  state = {
    html: ""
  };

  componentDidMount() {
    this.renderMarkdown();
  }

  renderMarkdown = () => {
    let self = this;
    remark()
      .use(html)
      .process(this.props.markdown, (err, md) => {
        this.setState({ html: md.contents });
      });
  };

  render() {
    if (typeof this.props.noTray !== "undefined")
      return <div dangerouslySetInnerHTML={{ __html: this.state.html }} />;

    return (
      <Tray
        title={<FormattedMessage id="app.notes" />}
        icon={<NotesIcon />}
        className="load-expanded"
      >
        <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
      </Tray>
    );
  }
}

export default Gist;

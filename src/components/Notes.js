import React from "react";
import { FormattedMessage } from "react-intl";
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

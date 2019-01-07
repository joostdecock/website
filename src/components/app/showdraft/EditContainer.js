import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, FormattedRelative, injectIntl } from "react-intl";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";
import { setDrafts } from "../../../store/actions/drafts";
import Breadcrumbs from "../../Breadcrumbs";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import backend from "../../../backend";
import { scrollToTop, distance } from "../../../utils";
import remark from "remark";
import html from "remark-html";
import Gist from "../draft/Gist";
import Sidebar from "./Sidebar";
import Update from "./Update";

class ModelEditContainer extends React.Component {
  state = {
    display: "draft",
    update: false,
    docs: false,
    gistFormat: "yaml",
    editing: false,
    markdown: "",
    markdownPreview: "",
    preview: false
  };

  componentDidMount() {
    this.setState({
      name: this.props.draft.name,
      notes: this.props.draft.notes
    });
    this.renderMarkdown(this.props.draft.notes);
  }

  componentDidUpdate() {
    if (this.state.editing) scrollToTop();
  }

  updateDisplay = (key, data = null) => {
    switch (key) {
      case "docs":
        this.setState({ display: "docs", docs: data, editing: true });
        break;
      case "update":
        this.setState({ display: "update", update: data, editing: true });
        break;
      default:
        this.setState({ display: "draft" });
    }
  };

  updateMetadata = (key, value) => {
    let data = {};
    data[key] = value;
    let handle = this.props.draft.handle;
    backend
      .saveDraft(handle, data)
      .then(res => {
        if (res.status === 200) {
          let drafts = this.props.drafts;
          drafts[handle] = res.data.draft;
          this.props.setDrafts(drafts);
          let msg = this.props.intl.formatMessage(
            { id: "app.fieldSaved" },
            { field: this.props.intl.formatMessage({ id: "app." + key }) }
          );
          this.props.showNotification("success", msg);
          this.setState({
            display: "draft",
            name: res.data.draft.name,
            notes: res.data.draft.notes
          });
          this.renderMarkdown(res.data.draft.notes);
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
      });
  };

  renderMarkdown = (markdown, preview = false) => {
    let self = this;
    let state = { preview };
    remark()
      .use(html)
      .process(markdown, (err, md) => {
        state[preview ? "markdownPreview" : "markdown"] = md.contents;
        self.setState(state);
      });
  };

  markdownPreview = (md, toggle) => {
    if (toggle === false) this.setState({ preview: false });
    else this.renderMarkdown(md, true);
  };

  render() {
    const draft = this.props.draft;
    return (
      <div>
        <Breadcrumbs via={[{ link: "/drafts", label: "app.drafts" }]}>
          {this.state.name}
        </Breadcrumbs>
        <h1>
          {this.state.name}
          <span className="handle">
            [#
            {draft.handle}]
          </span>
        </h1>
        <TwoColumns>
          <Column wide>
            {this.state.display === "draft" ? (
              <React-Fragment>
                <div className="notes">
                  <div className="filename">
                    <FormattedMessage id="app.notes" />
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: this.state.markdown }}
                  />
                </div>
                <Gist gist={draft.gist} format={this.state.gistFormat} />
              </React-Fragment>
            ) : (
              ""
            )}
            {this.state.display === "docs" ? <p>Show docs here</p> : ""}
            {this.state.display === "update" ? (
              <Update
                field={this.state.update}
                draft={draft}
                updateDisplay={this.updateDisplay}
                updateMetadata={this.updateMetadata}
                preview={this.state.preview}
                markdownPreview={this.markdownPreview}
                markdown={this.state.markdownPreview}
              />
            ) : (
              ""
            )}
          </Column>
          <Column narrow right>
            <Sidebar
              draft={draft}
              updateDisplay={this.updateDisplay}
              display={this.state.display}
            />
          </Column>
        </TwoColumns>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  drafts: state.drafts,
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  setDrafts: drafts => dispatch(setDrafts(drafts)),
  showNotification: (style, message) =>
    dispatch(showNotification(style, message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ModelEditContainer));

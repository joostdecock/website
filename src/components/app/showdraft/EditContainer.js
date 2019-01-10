import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { showNotification } from "../../../store/actions/notification";
import { setDrafts } from "../../../store/actions/drafts";
import { setGist } from "../../../store/actions/gist";
import Breadcrumbs from "../../Breadcrumbs";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import backend from "../../../backend";
import { scrollToTop, locLang } from "../../../utils";
import remark from "remark";
import html from "remark-html";
import Actions from "./Actions";
import Update from "./Update";
import { navigate } from "gatsby";
import Center from "../../Center";
import Spinner from "../../Spinner";
import Button from "@material-ui/core/Button";
import config from "../../../config/frontend";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Field from "../../fields/Field";
import FieldDrawers from "../../fields/FieldDrawers";
import Gist from "../../Gist";
import Notes from "../../Notes";
import { editDraftFields } from "../../../config/fields";

class ModelEditContainer extends React.Component {
  state = {
    display: "draft",
    data: false
  };

  injectFieldValues = () => {
    let fields = editDraftFields;
    let draft = this.props.draft;
    for (let field of Object.keys(fields.info.items)) {
      fields.info.items[field].value = draft[field];
    }

    return fields;
  };

  linkToClipboard = () => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("share"));
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

  updateDisplay = (key, data = null) => {
    if (key === null) key = "draft";
    this.setState({ display: key, data });
  };

  updateField = (key, value, config = null) => {
    if (value === config.value)
      return this.props.showNotification(
        "info",
        <FormattedMessage id="app.noChanges" />
      );
    if (key === "notes") this.renderMarkdown(value);
    let data = {};
    let handle = this.props.draft.handle;
    data[key] = value;
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
          this.setState({ display: "draft" });
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
      });
  };

  draftThis = () => {
    this.setState({ show: "spinner" });
    this.props.setGist(this.props.draft.gist);
    navigate(locLang.set("/draft/from/gist", this.props.language));
  };

  removeDraft = () => {
    this.setState({ display: "spinner" });
    let handle = this.props.draft.handle;
    backend
      .removeDraft(handle)
      .then(res => {
        if (res.status === 204) {
          let drafts = this.props.drafts;
          delete drafts[handle];
          this.props.setDrafts(drafts);
          let msg = this.props.intl.formatMessage(
            { id: "app.fieldRemoved" },
            { field: this.props.intl.formatMessage({ id: "app.draft" }) }
          );
          this.props.showNotification("success", msg);
          navigate(locLang.set("/drafts", this.props.language));
        } else this.setState({ display: "draft" });
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
      });
  };

  render() {
    const draft = this.props.draft;
    let fields = this.injectFieldValues();
    return (
      <div>
        <Breadcrumbs via={[{ link: "/drafts", label: "app.drafts" }]}>
          {this.state.name}
        </Breadcrumbs>
        <h1>
          {draft.name}
          <span className="handle">
            [#
            {draft.handle}]
          </span>
        </h1>
        <TwoColumns>
          <Column wide>
            {this.state.display === "draft" ? (
              <React-Fragment>
                <Notes
                  markdown={this.props.draft.notes}
                  key={this.props.draft.notes}
                  noTray
                />
              </React-Fragment>
            ) : (
              ""
            )}
            {this.state.display === "gist" ? (
              <React-Fragment>
                <Gist
                  gist={draft.gist}
                  format={this.state.format}
                  className="mt1"
                />
              </React-Fragment>
            ) : (
              ""
            )}
            {this.state.display === "docs" ? <p>Show docs here</p> : ""}
            {this.state.display === "share" ? (
              <React-Fragment>
                <h2>
                  <FormattedMessage id="app.share" />
                </h2>
                <div className="gist">
                  <div className="gist-header txt-right">
                    <Button color="secondary" onClick={this.linkToClipboard}>
                      <FormattedMessage id="app.copy" />
                    </Button>
                  </div>
                  <span className="copy-this" id="share">
                    {config.url.substring(0, config.url.length - 1)}
                    {locLang.set("/gist/" + draft.handle, this.props.language)}
                  </span>
                </div>
              </React-Fragment>
            ) : (
              ""
            )}
            {this.state.display === "update" ? (
              <Field
                {...this.state.data}
                updateField={this.updateField}
                updateDisplay={this.updateDisplay}
              />
            ) : (
              ""
            )}
            {this.state.display === "spinner" ? (
              <Center>
                <Spinner size={200} />
              </Center>
            ) : (
              ""
            )}
          </Column>
          <Column narrow right>
            <div className="stick">
              <FieldDrawers
                config={fields}
                display={this.state.display}
                updateDisplay={this.updateDisplay}
                buttons={{
                  draft: this.draftThis,
                  share: () => this.updateDisplay("share"),
                  gist: () => this.updateDisplay("gist"),
                  remove: this.removeDraft
                }}
              />
            </div>
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
  setGist: gist => dispatch(setGist(gist)),
  setDrafts: drafts => dispatch(setDrafts(drafts)),
  showNotification: (style, message) =>
    dispatch(showNotification(style, message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ModelEditContainer));

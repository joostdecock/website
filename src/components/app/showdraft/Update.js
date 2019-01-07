import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FormattedMessage, injectIntl } from "react-intl";
import ValidIcon from "@material-ui/icons/CheckCircle";
import InvalidIcon from "@material-ui/icons/Warning";
import { locLang } from "../../../utils";
import remark from "remark";
import html from "remark-html";
import backend from "../../../backend";
import { validateEmail, validateTld } from "../../../utils";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import i18nConfig from "../../../config/i18n";
import { Link } from "gatsby";
import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import SelectImageIcon from "@material-ui/icons/AddAPhoto";
import Tray from "../../Tray";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import PreviewIcon from "@material-ui/icons/Notes";
import CloseIcon from "@material-ui/icons/Close";

class Update extends React.Component {
  state = {
    markdownPreview: "",
    markdownHelp: { title: "", html: "" },
    name: "",
    notes: ""
  };

  componentDidMount() {
    this.setState({
      name: this.props.draft.name,
      notes: this.props.draft.notes
    });
  }

  handleValueUpdate = evt => {
    let field = evt.target.id;
    let value = evt.target.value;
    let state = {};
    state[field] = value;
    this.setState(state);
  };

  render() {
    const { field, intl, value } = this.props;
    const { emailValid, usernameValid } = this.state;
    const heading = (
      <h5>
        <FormattedMessage id={"app." + field} />
      </h5>
    );
    const buttons = (
      <div className="txt-right">
        {field === "notes" ? (
          <Button
            variant="outlined"
            color="primary"
            className="mr05"
            onClick={() =>
              this.props.markdownPreview(this.state.notes, !this.props.preview)
            }
          >
            {this.props.preview ? (
              <CloseIcon className="mr05" />
            ) : (
              <PreviewIcon className="mr05" />
            )}
            <FormattedMessage id="app.preview" />
          </Button>
        ) : (
          ""
        )}
        <Button
          variant="outlined"
          color="primary"
          className="mr05"
          onClick={() => this.props.updateDisplay("draft")}
        >
          <CancelIcon className="mr05" />
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.props.updateMetadata(field, this.state[field])}
        >
          <SaveIcon className="mr05" />
          <FormattedMessage id="app.update" />
        </Button>
      </div>
    );
    switch (field) {
      case "name":
        return (
          <div>
            {heading}
            <TextField
              autoFocus={true}
              id={field}
              fullWidth={true}
              label={intl.formatMessage({ id: "app." + field })}
              margin="normal"
              variant="outlined"
              value={this.state.name}
              type="text"
              onChange={this.handleValueUpdate}
            />
            {buttons}
          </div>
        );
      default:
        return (
          <div>
            <h5>
              <FormattedMessage id="app.notes" />
              &nbsp;
              <small>
                (<FormattedMessage id="app.thisFieldSupportsMarkdown" />)
              </small>
            </h5>
            {this.props.preview ? (
              <div className="notes">
                <div className="filename">
                  <FormattedMessage id="app.notes" />
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: this.props.markdown }}
                />
              </div>
            ) : (
              <TextField
                id="notes"
                multiline={true}
                rows="8"
                rowsMax="24"
                fullWidth={true}
                label={intl.formatMessage({ id: "app.notes" })}
                margin="normal"
                variant="outlined"
                value={this.state.notes}
                onChange={this.handleValueUpdate}
              />
            )}
            {buttons}
          </div>
        );
    }
  }
}

Update.propTypes = {
  field: PropTypes.string.isRequired,
  draft: PropTypes.object.isRequired
};

export default injectIntl(Update);

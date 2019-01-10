import React from "react";
import PropTypes from "prop-types";
import TextFieldMui from "@material-ui/core/TextField";
import FieldButtons from "./FieldButtons";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { FormattedMessage } from "react-intl";
import remark from "remark";
import html from "remark-html";
import Buttonbar from "../Buttonbar";
import EditIcon from "@material-ui/icons/Edit";
import ShowIcon from "@material-ui/icons/Note";

class MarkdownField extends React.PureComponent {
  state = {
    value: "",
    preview: 0,
    markdownPreview: ""
  };

  componentDidMount() {
    this.setState({ value: this.props.config.value });
  }

  handleValueUpdate = evt => {
    this.setState({ value: evt.target.value });
  };

  togglePreview = evt => {
    let preview = 0;
    if (this.state.preview === 0) {
      preview = 1;
      remark()
        .use(html)
        .process(this.state.value, (err, md) => {
          this.setState(state => ({
            preview,
            markdownPreview: md.contents
          }));
        });
    }
    this.setState({ preview });
  };

  render() {
    let { item, config, intl } = this.props;
    let { value } = this.state;
    return (
      <React-Fragment>
        {this.state.preview ? (
          <div className="notes">
            <div className="filename">
              <FormattedMessage id={config.label} />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: this.state.markdownPreview }}
            />
          </div>
        ) : (
          <TextFieldMui
            autoFocus={true}
            id={item}
            fullWidth={true}
            label={intl.formatMessage({ id: config.label })}
            margin="normal"
            variant="outlined"
            value={value}
            type="text"
            multiline={true}
            rows="6"
            rowsMax="24"
            onChange={this.handleValueUpdate}
          />
        )}
        <Buttonbar reverse>
          <FieldButtons
            config={config}
            item={item}
            value={value}
            updateDisplay={this.props.updateDisplay}
            updateField={this.props.updateField}
          />
          <div className="toggle-container txt-center">
            <ToggleButtonGroup exlusive onChange={this.togglePreview}>
              <ToggleButton
                className={this.state.preview ? "toggle" : "toggle selected"}
                value="true"
                selected={this.state.preview ? false : true}
              >
                <EditIcon />
              </ToggleButton>
              <ToggleButton
                className={this.state.preview ? "toggle selected" : "toggle"}
                selected={this.state.preview ? true : false}
              >
                <ShowIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Buttonbar>
      </React-Fragment>
    );
  }
}

MarkdownField.propTypes = {
  key: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

export default MarkdownField;

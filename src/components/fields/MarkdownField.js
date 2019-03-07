import React from "react";
import PropTypes from "prop-types";
import TextFieldMui from "@material-ui/core/TextField";
import FieldButtons from "./FieldButtons";
import { FormattedMessage } from "react-intl";
import Markdown from "react-markdown";

class MarkdownField extends React.PureComponent {
  state = {
    value: ""
  };

  componentDidMount() {
    this.setState({ value: this.props.config.value });
  }

  handleValueUpdate = evt => {
    this.setState({ value: evt.target.value });
  };

  render() {
    let { item, config, intl } = this.props;
    let { value } = this.state;
    return (
      <React.Fragment>
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
        <FieldButtons
          config={config}
          item={item}
          value={value}
          updateDisplay={this.props.updateDisplay}
          updateField={this.props.updateField}
        />
        <h4>
          <FormattedMessage id="app.preview" />
        </h4>
        <div className="notes">
          <div className="filename">
            <FormattedMessage id={config.label} />
          </div>
          <Markdown source={value} />
        </div>
      </React.Fragment>
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

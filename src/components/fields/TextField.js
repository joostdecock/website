import React from "react";
import PropTypes from "prop-types";
import TextFieldMui from "@material-ui/core/TextField";
import FieldButtons from "./FieldButtons";

class TextField extends React.PureComponent {
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
          onChange={this.handleValueUpdate}
        />
        <FieldButtons
          config={config}
          item={item}
          value={value}
          updateDisplay={this.props.updateDisplay}
          updateField={this.props.updateField}
        />
      </React.Fragment>
    );
  }
}

TextField.propTypes = {
  key: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

export default TextField;

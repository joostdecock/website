import React from "react";
import PropTypes from "prop-types";
import FieldButtons from "./FieldButtons";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class RadioField extends React.PureComponent {
  state = {
    value: ""
  };

  componentDidMount() {
    this.setState({ value: this.props.config.value });
  }

  handleValueUpdate = evt => {
    this.setState({ value: this.stringValue(evt.target.value) });
  };

  stringValue = value => {
    if (value === true) value = "true";
    if (value === false) value = "false";

    return value;
  };

  render() {
    let { item, config, intl } = this.props;
    let { value } = this.state;

    return (
      <React-Fragment>
        <RadioGroup
          name={item}
          onChange={this.handleValueUpdate}
          value={this.stringValue(value)}
        >
          {this.props.config.options.map(option => (
            <FormControlLabel
              control={<Radio color="primary" />}
              value={this.stringValue(option.value)}
              checked={this.stringValue(option.value) === value ? true : false}
              label={intl.formatMessage({ id: option.label })}
            />
          ))}
        </RadioGroup>
        <FieldButtons
          config={config}
          item={item}
          value={value}
          updateDisplay={this.props.updateDisplay}
          updateField={this.props.updateField}
        />
      </React-Fragment>
    );
  }
}

RadioField.propTypes = {
  key: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

export default RadioField;

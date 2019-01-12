import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { distance } from "../../utils";
import IconButton from "@material-ui/core/IconButton";
import InvalidIcon from "@material-ui/icons/Warning";
import InputAdornment from "@material-ui/core/InputAdornment";
import FieldButtons from "./FieldButtons";

class DistanceField extends React.PureComponent {
  state = {
    value: "",
    realValue: ""
  };

  componentDidMount() {
    let realValue = this.props.config.value;
    let value = distance.asText(realValue, this.props.units);
    this.setState({ value, realValue });
  }

  handleValueUpdate = evt => {
    let value = evt.target.value;
    let realValue = value * (this.props.units === "metric" ? 10 : 25.4);
    this.setState({ value, realValue });
  };

  render() {
    let { item, config, intl, units } = this.props;
    let { value, realValue } = this.state;
    return (
      <React.Fragment>
        <TextField
          autoFocus={true}
          id={item}
          fullWidth={true}
          label={intl.formatMessage({ id: config.label })}
          margin="normal"
          variant="outlined"
          value={value}
          type="text"
          onChange={this.handleValueUpdate}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {distance.asMm(value, units) === false ? (
                  <InvalidIcon color="error" />
                ) : (
                  <IconButton classes={{ label: "color-success" }} small>
                    {units === "imperial" ? '"' : "cm"}
                  </IconButton>
                )}
              </InputAdornment>
            )
          }}
        />
        <FieldButtons
          config={config}
          item={item}
          value={realValue}
          updateDisplay={this.props.updateDisplay}
          updateField={this.props.updateField}
        />
      </React.Fragment>
    );
  }
}

DistanceField.propTypes = {
  units: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

export default DistanceField;

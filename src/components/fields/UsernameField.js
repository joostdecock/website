import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import FieldButtons from "./FieldButtons";
import ValidIcon from "@material-ui/icons/CheckCircle";
import InvalidIcon from "@material-ui/icons/Warning";
import InputAdornment from "@material-ui/core/InputAdornment";
import backend from "../../apis/backend";

class UsernameField extends React.PureComponent {
  state = {
    value: "",
    usernameValid: true
  };

  componentDidMount() {
    this.setState({ value: this.props.config.value });
  }

  handleValueUpdate = evt => {
    this.setState({ value: evt.target.value });
    backend
      .availableUsername({ username: evt.target.value })
      .then(res => {
        if (res.status === 200) this.setState({ usernameValid: true });
      })
      .catch(err => this.setState({ usernameValid: false }));
  };

  render() {
    let { item, config, intl } = this.props;
    let { value } = this.state;
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
              <InputAdornment position="start">
                {this.state.usernameValid ? (
                  <ValidIcon classes={{ root: "color-success" }} />
                ) : (
                  <InvalidIcon color="error" />
                )}
              </InputAdornment>
            )
          }}
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

UsernameField.propTypes = {
  key: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

export default UsernameField;

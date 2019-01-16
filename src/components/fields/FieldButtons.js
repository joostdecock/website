import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

const FieldButtons = props => {
  return (
    <div className="txt-right">
      <Button
        variant="outlined"
        color="primary"
        className="mr05"
        onClick={() => props.updateDisplay(null)}
      >
        <CancelIcon className="mr05" />
        <FormattedMessage id="app.cancel" />
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.updateField(props.item, props.value, props.config)}
      >
        <SaveIcon className="mr05" />
        <FormattedMessage id="app.update" />
      </Button>
    </div>
  );
};

FieldButtons.propTypes = {
  config: PropTypes.object.isRequired,
  updateDisplay: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired
};

export default FieldButtons;

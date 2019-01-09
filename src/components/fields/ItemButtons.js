import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

const ItemButtons = props => {
  return (
    <React-Fragment>
      <div className="p1 txt-right">
        <Button
          className="mr05"
          variant="outlined"
          onClick={
            props.display === "docs"
              ? () => props.updateDisplay(null)
              : () => props.updateDisplay("docs", props.key)
          }
        >
          {props.display === "docs" ? <CloseIcon className="mr05" /> : ""}
          <FormattedMessage id="app.docs" />
        </Button>
        <Button
          variant="outlined"
          onClick={
            props.display === "update"
              ? () => props.updateDisplay(null)
              : () => props.updateDisplay("update", props.passBack)
          }
        >
          {props.display === "update" ? <CloseIcon className="mr05" /> : ""}
          <FormattedMessage id="app.update" />
        </Button>
      </div>
    </React-Fragment>
  );
};

ItemButtons.propTypes = {
  config: PropTypes.object.isRequired,
  updateDisplay: PropTypes.func.isRequired
};

export default ItemButtons;

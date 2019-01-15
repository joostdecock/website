import React from "react";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import CloseIcon from "@material-ui/icons/Close";

class Layout extends React.Component {
  state = {
    value: this.props.value
  };

  toggleOption = () => {
    let value = "false";
    if (this.state.value === "false") value = "true";
    this.setState({ value });
    this.props.updateOption(this.props.option, value);
  };

  render() {
    let { desc, display, updateDisplay, dflt } = this.props;
    return (
      <div className="option-wrapper">
        <p className="option-desc">{desc}</p>
        {this.state.value === "false" ? (
          <p className="mb1 mt1">
            <Button
              variant="contained"
              fullWidth={true}
              color="primary"
              onClick={() => updateDisplay("layout")}
              className="mr05"
            >
              <FormattedMessage id="app.configureLayout" />
            </Button>
          </p>
        ) : (
          ""
        )}
        <p className="option-actions">
          {this.state.value === "" + dflt ? (
            ""
          ) : (
            <Button
              variant="outlined"
              onClick={() => this.props.updateOption("layout", true)}
              className="mr05"
            >
              <FormattedMessage id="app.reset" />
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={
              display === "docs"
                ? () => updateDisplay("draft")
                : () => updateDisplay("docs", this.props.option)
            }
          >
            {display === "docs" ? <CloseIcon className="mr05" /> : ""}
            <FormattedMessage id="app.docs" />
          </Button>
        </p>
      </div>
    );
  }
}

export default Layout;

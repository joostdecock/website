import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import CloseIcon from "@material-ui/icons/Close";

class Paperless extends React.Component {
  state = {
    value: this.props.value
  };

  toggleOption = () => {
    let value = "false";
    if (this.state.value === "false") value = "true";
    this.setState({ value });
    this.props.updateOption("paperless", value);
  };

  render() {
    let { intl, desc, docs, showDocs } = this.props;
    return (
      <div className="option-wrapper">
        <p className="option-desc">{desc}</p>
        <RadioGroup
          name="units"
          onChange={this.toggleOption}
          value={this.state.value}
        >
          <FormControlLabel
            control={<Radio color="primary" />}
            value="false"
            checked={this.state.value === "false" ? true : false}
            label={intl.formatMessage({ id: "app.no" })}
          />
          <FormControlLabel
            control={<Radio color="primary" />}
            checked={this.state.value === "true" ? true : false}
            value="true"
            label={intl.formatMessage({ id: "app.yes" })}
          />
        </RadioGroup>
        <p className="option-actions">
          {this.state.value === "false" ? (
            ""
          ) : (
            <Button
              variant="outlined"
              onClick={this.toggleOption}
              className="mr1"
            >
              <FormattedMessage id="app.reset" />
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={() => showDocs(docs ? false : "paperless")}
          >
            {docs ? <CloseIcon className="mr1" /> : ""}
            <FormattedMessage id="app.docs" />
          </Button>
        </p>
      </div>
    );
  }
}

export default Paperless;

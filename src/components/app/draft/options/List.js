import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import CloseIcon from "@material-ui/icons/Close";

class List extends React.Component {
  state = {
    value: this.props.value
  };

  setValue = (evt, value) => {
    this.setState({ value });
    this.props.updateOption(this.props.option, value);
  };

  render() {
    let { desc, display, updateDisplay } = this.props;
    return (
      <div className="option-wrapper">
        <p className="option-desc">{desc}</p>
        <RadioGroup
          name="units"
          onChange={this.setValue}
          value={this.state.value}
        >
          {Object.keys(this.props.list).map((item, index) => (
            <FormControlLabel
              key={item}
              control={<Radio color="primary" />}
              value={item}
              checked={this.state.selected === item ? true : false}
              label={this.props.list[item]}
            />
          ))}
        </RadioGroup>
        <p className="option-actions">
          {this.state.value === this.props.dflt ? (
            ""
          ) : (
            <Button
              variant="outlined"
              onClick={() => this.setValue(null, this.props.dflt)}
              className="mr1"
            >
              <FormattedMessage id="app.reset" />
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={
              display === "docs"
                ? () => updateDisplay("draft")
                : () => updateDisplay("docs", "paperless")
            }
          >
            {display === "docs" ? <CloseIcon className="mr1" /> : ""}
            <FormattedMessage id="app.docs" />
          </Button>
        </p>
      </div>
    );
  }
}

export default List;

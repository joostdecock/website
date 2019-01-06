import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "@material-ui/lab/Slider";

class SeamAllowance extends React.Component {
  state = {
    value: this.props.value,
    selected: "none",
    customValue: this.props.units === "imperial" ? 9.525 : 10,
    dragging: false
  };

  setSelected = (evt, value, customValue = false) => {
    switch (value) {
      case "none":
        this.setState({
          value: 0,
          selected: "none"
        });
        this.props.updateOption("sa", 0);
        break;
      case "default":
        let dflt = this.props.units === "imperial" ? 9.525 : 10;
        this.setState({
          value: dflt * this.saFactor(),
          selected: "default"
        });
        this.props.updateOption("sa", dflt * this.saFactor());
        break;
      case "custom":
        this.setState(state => ({
          value: state.customValue,
          selected: "custom"
        }));
        this.props.updateOption("sa", this.state.customValue);
        break;
      default:
        break;
    }
  };

  saFactor = () => {
    // Check for custom SA in the pattern
    let saFactor = 1;
    if (typeof this.props.patternInfo.saFactor !== "undefined")
      saFactor = this.props.patternInfo.saFactor;

    return saFactor;
  };

  startDrag = () => {
    this.setState({ dragging: true });
  };

  endDrag = (evt, value) => {
    this.setState({ dragging: false });
    this.updateCustomValue(null, false);
  };

  updateCustomValue = (evt, value) => {
    if (value === false) {
      value = this.state.customValue;
      this.setState({ value: this.state.customValue });
      this.props.updateOption("sa", this.state.customValue);
    } else
      this.setState({ customValue: value }, function() {
        if (!this.state.dragging)
          this.setSelected(null, "custom", this.state.customValue);
      });
  };

  render() {
    let { intl, desc, display, updateDisplay } = this.props;
    return (
      <div className="option-wrapper">
        <p className="option-desc">{desc}</p>
        <RadioGroup
          name="units"
          onChange={this.setSelected}
          value={this.state.selected}
        >
          <FormControlLabel
            control={<Radio color="primary" />}
            value="none"
            checked={this.state.selected === "none" ? true : false}
            label={intl.formatMessage({ id: "app.noSeamAllowance" })}
          />
          <FormControlLabel
            control={<Radio color="primary" />}
            checked={this.state.selected === "default" ? true : false}
            value="default"
            label={intl.formatMessage({ id: "app.standardSeamAllowance" })}
          />
          <FormControlLabel
            control={<Radio color="primary" />}
            checked={this.state.selected === "custom" ? true : false}
            value="custom"
            label={intl.formatMessage({ id: "app.customSeamAllowance" })}
          />
        </RadioGroup>
        {this.state.selected === "custom" ? (
          <div className="slider">
            <Slider
              value={this.state.customValue}
              min={this.props.units === "imperial" ? 4.7625 : 5}
              max={this.props.units === "imperial" ? 25.4 : 25}
              step={this.props.units === "imperial" ? 0.79375 : 1}
              onDragStart={this.startDrag}
              onDragEnd={this.endDrag}
              onChange={this.updateCustomValue}
              classes={{
                track: "slider-track",
                thumb: "slider-thumb"
              }}
            />
          </div>
        ) : (
          ""
        )}
        <p className="option-actions">
          {this.state.value === "false" ? (
            ""
          ) : (
            <Button
              variant="outlined"
              onClick={() => this.setSelected(null, "none")}
              className="mr1"
            >
              <FormattedMessage id="app.reset" />
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={
              display === "docs"
                ? () => updateDisplay("drafts")
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

export default SeamAllowance;

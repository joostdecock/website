import React from "react";
import { round } from "../../../../utils";
import Slider from "@material-ui/lab/Slider";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";

class Percentage extends React.Component {
  state = {
    value: this.props.value,
    dragging: false
  };

  updateOption = (evt, value) => {
    this.setState({ value: round(value) });
    if (!this.state.dragging)
      this.props.updateOption(this.props.option, value / 100);
  };

  startDrag = () => {
    this.setState({ dragging: true });
  };

  endDrag = (evt, value) => {
    this.setState({ dragging: false });
    this.updateOption(false, this.state.value);
  };

  render() {
    return (
      <div className="option-wrapper">
        <div className="slider">
          <Slider
            value={this.state.value}
            min={this.props.config.min}
            max={this.props.config.max}
            step={0.1}
            onDragStart={this.startDrag}
            onDragEnd={this.endDrag}
            onChange={this.updateOption}
            classes={{
              track: "slider-track",
              thumb: "slider-thumb"
            }}
          />
        </div>
        <p className="option-desc">
          <FormattedMessage id={this.props.desc} />
        </p>
        <p className="option-actions">
          {this.state.value === this.props.config.pct ? (
            ""
          ) : (
            <Button
              variant="outlined"
              onClick={() => this.updateOption(false, this.props.config.pct)}
              className="mr1"
            >
              <FormattedMessage id="app.reset" />
            </Button>
          )}
          <Button variant="outlined">
            <FormattedMessage id="app.docs" />
          </Button>
        </p>
      </div>
    );
  }
}

export default Percentage;

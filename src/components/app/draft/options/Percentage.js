import React from "react";
import { round } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import Tray from "../../../Tray";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Slider from "@material-ui/lab/Slider";

class Percentage extends React.Component {
  state = { value: this.props.config.pct };

  updateOption = (evt, value) => {
    console.log("% props", this.props);
    this.setState({ value: round(value) });
    let options = this.props.settings.options;
    if (typeof options === "undefined") options = {};
    options[this.props.option] = value / 100;
    this.props.updateSettings("options", options);
  };

  render() {
    return (
      <div className="slider">
        {this.state.value}
        <pre>{JSON.stringify(this.props.config, null, 2)}</pre>
        <Slider
          value={this.state.value}
          min={this.props.config.min}
          max={this.props.config.max}
          step={0.1}
          onChange={this.updateOption}
        />
      </div>
    );
  }
}

export default Percentage;

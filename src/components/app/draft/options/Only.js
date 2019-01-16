import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { FormattedMessage } from "react-intl";
import CloseIcon from "@material-ui/icons/Close";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

class Only extends React.Component {
  state = {
    value: this.props.value,
    partList: {}
  };

  initPartList = () => {
    let list = {};
    for (let part of this.props.patternInfo.parts) list[part] = true;
    return list;
  };

  setSelected = (evt, value, customValue = false) => {
    switch (value) {
      case "false":
        this.setState({ value });
        this.props.updateOption("only", false);
        break;
      case "custom":
        let list = this.initPartList();
        this.setState({
          value: Object.keys(list),
          partList: list
        });
        break;
      default:
        break;
    }
  };

  togglePart = part => {
    let partList = this.state.partList;
    partList[part] = !partList[part];
    let value = [];
    for (let p of this.props.patternInfo.parts) if (partList[p]) value.push(p);
    this.setState({ value, partList });
    this.props.updateOption("only", value);
  };

  render() {
    let { intl, desc, display, updateDisplay } = this.props;
    return (
      <div className="option-wrapper">
        <p className="option-desc">{desc}</p>
        <RadioGroup
          name="units"
          onChange={this.setSelected}
          value={this.state.value}
        >
          <FormControlLabel
            control={<Radio color="primary" />}
            value="false"
            checked={this.state.value === "false" ? true : false}
            label={intl.formatMessage({ id: "app.default" })}
          />
          <FormControlLabel
            control={<Radio color="primary" />}
            checked={this.state.value === "false" ? false : true}
            value={this.state.value === "false" ? "custom" : this.state.value}
            label={intl.formatMessage({ id: "app.custom" })}
          />
        </RadioGroup>
        {this.state.value === "false" ? (
          ""
        ) : (
          <div className="slider">
            <FormGroup>
              {this.props.patternInfo.parts.map((part, index) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={this.state.partList[part]}
                      onChange={() => this.togglePart(part)}
                      value={part}
                    />
                  }
                  label={intl.formatMessage({ id: "parts." + part })}
                />
              ))}
            </FormGroup>
          </div>
        )}
        <p className="option-actions">
          {this.state.value === "false" ? (
            ""
          ) : (
            <Button
              variant="outlined"
              onClick={() => this.setSelected(null, "false")}
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
                : () => updateDisplay("docs", "only")
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

export default Only;

import React from "react";
import PropTypes from "prop-types";
import { patternOption, capitalize, locLang, optionDesc } from "../../../utils";
import { FormattedMessage, injectIntl } from "react-intl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SelectIcon from "@material-ui/icons/KeyboardArrowRight";
import CollapseIcon from "@material-ui/icons/KeyboardArrowDown";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import TuneIcon from "@material-ui/icons/Tune";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Option from "./options/Container";
import Button from "@material-ui/core/Button";

class OptionPicker extends React.Component {
  state = {
    expanded: {},
    option: false
  };

  componentDidMount() {
    let expanded = {};
    for (let option of this.props.pattern.optionGroups) {
      if (typeof option !== "string") {
        let key = Object.keys(option).pop();
        expanded[key] = false;
        for (let subOption of option[key]) {
          if (typeof subOption !== "string") {
            let subKey = Object.keys(subOption).pop();
            expanded[subKey] = false;
          }
        }
      }
    }
    this.setState({ expanded });
  }

  optionGroup(key, options, level = 0) {
    let divider = ""; // <hr className="nm"/>
    let heading = (
      <ListItem button onClick={() => this.toggleGroup(key)}>
        <ListItemIcon>
          <TuneIcon className={"indent" + level} />
        </ListItemIcon>
        <ListItemText inset>
          <h6>
            <FormattedMessage id={"optiongroups." + key} />
          </h6>
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton aria-label="Comments">
            {this.state.expanded[key] ? (
              <CollapseIcon color="primary" />
            ) : (
              <SelectIcon color="primary" />
            )}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
    let items = [divider, heading];
    let colItems = [];
    // Sort items regardless of language
    let sorted = {};
    for (let subOption of options) {
      let label = "";
      if (typeof subOption === "string") {
        label = this.props.intl.formatMessage({
          id: "options." + subOption + ".title"
        });
      } else {
        label = Object.keys(subOption).pop();
        label =
          "__" + this.props.intl.formatMessage({ id: "optiongroups." + label });
      }
      sorted[label] = subOption;
    }
    for (let label of Object.keys(sorted).sort()) {
      let subOption = sorted[label];
      if (typeof subOption === "string") {
        let optConf = this.props.pattern.config.options[subOption];
        let optVal = this.props.settings.options[subOption];
        let dfltVal = patternOption.dflt(optConf);
        let dflt = optVal === dfltVal ? true : false;
        if (typeof optVal === "undefined") dflt = true;
        if (dflt) optVal = dfltVal;
        colItems.push(
          <ListItem
            button
            key={subOption}
            onClick={() => this.editOption(subOption)}
            className={
              this.state.option === subOption
                ? "option-header selected"
                : "option-header"
            }
          >
            <ListItemIcon>
              {this.state.option === subOption ? (
                <CollapseIcon className={"indent" + (level + 1)} />
              ) : (
                <SelectIcon className={"indent" + (level + 1)} />
              )}
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
            <ListItemSecondaryAction>
              <span
                className={dflt ? "option-value dflt" : "option-value non-dflt"}
              >
                {patternOption.format(optVal, optConf)}
              </span>
            </ListItemSecondaryAction>
          </ListItem>
        );
        colItems.push(
          <Collapse
            in={this.state.option === subOption ? true : false}
            timeout="auto"
            unmountOnExit
          >
            <Option
              option={subOption}
              pattern={this.props.pattern.config.name}
              config={optConf}
              value={optVal}
              language={this.props.language}
              updateOption={this.props.updateOption}
            />
            <div className="option-footer">
              {dflt ? (
                ""
              ) : (
                <Button small onClick={() => this.props.resetOption(subOption)}>
                  <FormattedMessage id="app.reset" />
                </Button>
              )}
              <Button small>
                <FormattedMessage id="app.docs" />
              </Button>
            </div>
          </Collapse>
        );
      } else {
        let subKey = Object.keys(subOption).pop();
        let subItems = this.optionGroup(subKey, subOption[subKey], level + 2);
        for (let s of subItems) colItems.push(s);
      }
    }
    items.push(
      <Collapse in={this.state.expanded[key]} timeout="auto" unmountOnExit>
        {colItems}
      </Collapse>
    );

    return items;
  }

  toggleGroup(key) {
    let expanded = { ...this.state.expanded };
    expanded[key] = !this.state.expanded[key];
    this.setState({ expanded });
  }

  editOption(key) {
    if (this.state.option === key) key = false;
    this.setState({ option: key });
  }

  optionGroups = this.props.pattern.optionGroups;
  render() {
    console.log(this.props);
    return (
      <div>
        <List component="nav">
          {this.props.pattern.optionGroups.map((option, index) => {
            let key = Object.keys(option).pop();
            return this.optionGroup(key, option[key]);
          })}
        </List>
      </div>
    );
  }
}

OptionPicker.propTypes = {
  patterns: PropTypes.array.isRequired
};

export default injectIntl(OptionPicker);

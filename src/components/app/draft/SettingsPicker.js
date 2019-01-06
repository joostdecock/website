import React from "react";
import { distance, patternOption } from "../../../utils";
import { FormattedMessage, injectIntl } from "react-intl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SelectIcon from "@material-ui/icons/KeyboardArrowRight";
import CollapseIcon from "@material-ui/icons/KeyboardArrowDown";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import OptionsIcon from "@material-ui/icons/Tune";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Option from "./options/Container";
import { settings as settingsStrings } from "@freesewing/i18n";

class SettingsPicker extends React.Component {
  state = {
    expanded: {},
    option: false
  };

  componentDidMount() {
    let expanded = {};
    for (let key of Object.keys(this.props.options)) {
      let option = this.props.options[key];
      if (typeof option !== "string") {
        for (let subOption of option) {
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
    let heading = (
      <ListItem key={key} button onClick={() => this.toggleGroup(key)}>
        <ListItemIcon>
          <OptionsIcon className={"indent" + level} />
        </ListItemIcon>
        <ListItemText inset>
          <h6 className="picker-title">
            <FormattedMessage id={"optiongroups." + key} />
          </h6>
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton aria-label="toggle">
            {this.state.expanded[key] ? (
              <CollapseIcon color="primary" />
            ) : (
              <SelectIcon color="primary" />
            )}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
    let items = [heading];
    let colItems = [];
    // Sort items regardless of language
    let sorted = {};
    for (let subOption of options) {
      let label = "";
      if (typeof subOption === "string") {
        let ikey;
        if (
          Object.keys(settingsStrings[this.props.language]).indexOf(
            subOption
          ) !== -1
        )
          ikey = `settings.${subOption}.title`;
        else ikey = `options.${this.props.pattern.name}.${subOption}.title`;
        label = this.props.intl.formatMessage({ id: ikey });
      } else {
        label = Object.keys(subOption).pop();
        label =
          "__" + this.props.intl.formatMessage({ id: "optiongroups." + label });
      }
      sorted[label] = subOption;
    }
    for (let label of Object.keys(sorted).sort()) {
      let subOption = sorted[label];
      if (typeof subOption !== "string") {
        let subKey = Object.keys(subOption).pop();
        let subItems = this.optionGroup(subKey, subOption[subKey], level + 2);
        for (let s of subItems) colItems.push(s);
      } else {
        let optConf, optVal, dfltVal, dflt, displayVal;
        if (typeof this.props.units === "string") {
          // Draft options
          optConf = subOption; // No config, just pass name
          optVal = this.props.settings[subOption]; // Draft options are always set in state
          // Default value requires some work
          switch (subOption) {
            case "paperless":
              dfltVal = false;
              displayVal = (
                <FormattedMessage id={optVal ? "app.yes" : "app.no"} />
              );
              break;
            case "complete":
              dfltVal = true;
              displayVal = (
                <FormattedMessage id={optVal ? "app.yes" : "app.no"} />
              );
              break;
            case "units":
              dfltVal = this.props.units;
              displayVal = <FormattedMessage id={"app." + optVal + "Units"} />;
              break;
            case "locale":
              dfltVal = this.props.language;
              displayVal = <FormattedMessage id={"i18n." + optVal} />;
              break;
            case "only":
              dfltVal = false;
              if (optVal === undefined) optVal = false;
              let displayId = "default";
              if (Array.isArray(optVal)) displayId = "custom";
              displayVal = <FormattedMessage id={"app." + displayId} />;
              break;
            case "margin":
              dfltVal = this.props.units === "imperial" ? 2.38125 : 2;
              displayVal = (
                <span
                  dangerouslySetInnerHTML={{
                    __html: distance.asHtml(optVal, this.props.units)
                  }}
                />
              );
              break;
            case "sa":
              dfltVal = 0;
              if (optVal === 0) displayVal = <FormattedMessage id="app.no" />;
              else
                displayVal = (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: distance.asHtml(optVal, this.props.units)
                    }}
                  />
                );
              break;
            default:
              break;
          }
          if (dfltVal === optVal) dflt = true;
          else dflt = false;
        } else {
          // Pattern options
          optConf = this.props.optionConfig[subOption];
          if (
            typeof this.props.settings.options !== "undefined" &&
            typeof this.props.settings.options[subOption] !== "undefined"
          )
            optVal = this.props.settings.options[subOption];
          dfltVal = patternOption.dflt(optConf);
          dflt = optVal === dfltVal ? true : false;
          if (typeof optVal === "undefined") dflt = true;
          if (dflt) optVal = dfltVal;
          if (Array.isArray(optConf.list))
            displayVal = (
              <FormattedMessage
                id={`options.${
                  this.props.pattern.name
                }.${subOption}.options.${optVal}`}
              />
            );
          else if (typeof optConf.bool !== "undefined")
            displayVal = (
              <FormattedMessage
                id={"app." + (optVal === true ? "yes" : "no")}
              />
            );
          else if (typeof optConf.mm !== "undefined")
            displayVal = (
              <span
                dangerouslySetInnerHTML={{
                  __html: distance.asHtml(optVal, this.props.units)
                }}
              />
            );
          else displayVal = patternOption.format(optVal, optConf);
        }
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
            <ListItemIcon className="picker-option-icon">
              {this.state.option === subOption ? (
                <CollapseIcon className={"indent" + (level + 1)} />
              ) : (
                <SelectIcon className={"indent" + (level + 1)} />
              )}
            </ListItemIcon>
            <ListItemText className="picker-option-title">{label}</ListItemText>
            <ListItemSecondaryAction className="picker-option-value">
              <span
                className={dflt ? "option-value dflt" : "option-value non-dflt"}
              >
                {displayVal}
              </span>
            </ListItemSecondaryAction>
          </ListItem>
        );
        colItems.push(
          <Collapse
            in={this.state.option === subOption ? true : false}
            timeout="auto"
            unmountOnExit
            key={"sub-" + subOption}
          >
            <Option
              option={subOption}
              pattern={this.props.pattern.config.name}
              patternInfo={
                subOption === "sa" || subOption === "only"
                  ? this.props.pattern
                  : false
              }
              config={optConf}
              value={optVal}
              language={this.props.language}
              updateOption={this.props.updateOption}
              updateDisplay={this.props.updateDisplay}
              display={this.props.display}
              settings={this.props.settings || false}
              units={this.props.units}
              dflt={dfltVal}
            />
          </Collapse>
        );
      }
    }
    items.push(
      <Collapse
        in={this.state.expanded[key]}
        key={"col-" + key}
        timeout="auto"
        unmountOnExit
      >
        {colItems}
      </Collapse>
    );

    return items;
  }

  toggleGroup(key) {
    let expanded = { ...this.state.expanded };
    expanded[key] = !this.state.expanded[key];
    this.setState({ expanded });
    this.props.updateDisplay("draft");
  }

  editOption(key) {
    if (this.state.option === key) key = false;
    this.setState({ option: key });
    this.props.updateDisplay("draft");
  }

  optionGroups = this.props.pattern.optionGroups;
  render() {
    return (
      <List component="nav">
        {Object.keys(this.props.options).map(key => {
          return this.optionGroup(key, this.props.options[key]);
        })}
      </List>
    );
  }
}

export default injectIntl(SettingsPicker);

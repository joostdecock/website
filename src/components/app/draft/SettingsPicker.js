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
import Option from "../draft/options/Container";
import { settings as settingsStrings } from "@freesewing/i18n";
import draftSettings from "../../../config/draftsettings";

class SettingsPicker extends React.Component {
  state = {
    expanded: "",
    expandedSub: "",
    option: false
  };

  optionGroup(patternInfo, key, options, level = 0) {
    let heading = (
      <ListItem key={key} button onClick={() => this.toggleGroup(key, level)}>
        <ListItemIcon>
          <OptionsIcon className={"indent" + level} color="primary" />
        </ListItemIcon>
        <ListItemText inset>
          <h6 className="picker-title">
            <FormattedMessage id={"optiongroups." + key} />
          </h6>
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton aria-label="toggle">
            {this.state.expanded === key ? (
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
        else ikey = `options.${patternInfo.name}.${subOption}.title`;
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
        let subItems = this.optionGroup(
          patternInfo,
          subKey,
          subOption[subKey],
          level + 2
        );
        for (let s of subItems) colItems.push(s);
      } else {
        let optConf, optVal, dfltVal, dflt, displayVal;
        if (this.props.mode === "draft") {
          // Draft options
          optConf = subOption; // No config, just pass name
          optVal = this.props.gist.settings[subOption]; // Draft options are always set in state
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
            case "layout":
              dfltVal = true;
              displayVal = (
                <FormattedMessage
                  id={
                    "app." +
                    (typeof optVal === "object" ? "manual" : "automatic")
                  }
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
          optConf = patternInfo.config.options[subOption];
          if (
            typeof this.props.gist.settings.options !== "undefined" &&
            typeof this.props.gist.settings.options[subOption] !== "undefined"
          )
            optVal = this.props.gist.settings.options[subOption];
          dfltVal = patternOption.dflt(optConf);
          dflt = optVal === dfltVal ? true : false;
          if (typeof optVal === "undefined") dflt = true;
          if (dflt) optVal = dfltVal;
          if (Array.isArray(optConf.list))
            displayVal = (
              <FormattedMessage
                id={`options.${
                  patternInfo.name
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
              pattern={patternInfo.config.name}
              patternInfo={
                subOption === "sa" || subOption === "only" ? patternInfo : false
              }
              config={optConf}
              value={optVal}
              language={this.props.language}
              updateOption={this.props.methods.updateOption}
              updateDisplay={this.props.methods.updateDisplay}
              display={this.props.display}
              settings={this.props.gist.settings || false}
              units={this.props.units}
              dflt={dfltVal}
            />
          </Collapse>
        );
      }
    }
    let expanded = false;
    if (this.state.expanded === key || this.state.expandedSub === key)
      expanded = true;
    items.push(
      <Collapse in={expanded} key={"col-" + key} timeout="auto" unmountOnExit>
        {colItems}
      </Collapse>
    );

    return items;
  }

  toggleGroup(key, level) {
    console.log("toggling sub", key, level);
    if (level > 0) this.setState({ expandedSub: key });
    else this.setState({ expanded: key });
    this.props.methods.updateDisplay("draft");
  }

  editOption(key) {
    if (this.state.option === key) key = false;
    this.setState({ option: key });
    this.props.methods.updateDisplay("draft");
  }

  render() {
    let groups;
    if (this.props.mode === "draft") groups = draftSettings.groups;
    else groups = this.props.patternInfo.optionGroups;

    return (
      <List component="nav">
        {Object.keys(groups).map(key =>
          this.optionGroup(this.props.patternInfo, key, groups[key])
        )}
      </List>
    );
  }
}

export default injectIntl(SettingsPicker);

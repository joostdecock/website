import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { optionDesc } from "../../../../utils";
import SliderOption from "./Slider";
import SeamAllowanceOption from "./SeamAllowance";
import OnlyOption from "./Only";
import BoolOption from "./Bool";
import LayoutOption from "./Layout";
import ListOption from "./List";
import i18nConfig from "../../../../config/i18n";

const OptionContainer = props => {
  let { intl } = props;
  let optionBaseProps = {
    option: props.option,
    intl,
    updateOption: props.updateOption,
    updateDisplay: props.updateDisplay,
    display: props.display
  };
  switch (props.option) {
    case "paperless":
    case "complete":
      return (
        <BoolOption
          {...optionBaseProps}
          value={props.value === true ? "true" : "false"}
          desc={intl.formatMessage({
            id: "settings." + props.option + ".description"
          })}
          dflt={props.dflt}
        />
      );
    case "layout":
      return (
        <LayoutOption
          {...optionBaseProps}
          value={props.value === true ? "true" : "false"}
          desc={intl.formatMessage({
            id: "settings." + props.option + ".description"
          })}
          dflt={props.dflt}
        />
      );
    case "sa":
      return (
        <SeamAllowanceOption
          {...optionBaseProps}
          value="false"
          desc={intl.formatMessage({
            id: "settings." + props.option + ".description"
          })}
          patternInfo={props.patternInfo}
          units={props.units}
        />
      );
    case "margin":
      return (
        <SliderOption
          {...optionBaseProps}
          value={props.value}
          desc={intl.formatMessage({
            id: "settings." + props.option + ".description"
          })}
          patternInfo={props.patternInfo}
          dflt={props.dflt}
          mm={true}
          config={{
            mm: props.dflt,
            min: props.dflt,
            max: props.units === "imperial" ? 25.4 : 25
          }}
          units={props.units}
          factor={1}
        />
      );
    case "locale":
    case "units":
      let list = {};
      if (props.option === "locale") {
        for (let lang of i18nConfig.languages)
          list[lang] = <FormattedMessage id={"i18n." + lang} />;
      } else {
        list["metric"] = <FormattedMessage id={"app.metricUnits"} />;
        list["imperial"] = <FormattedMessage id={"app.imperialUnits"} />;
      }
      return (
        <ListOption
          {...optionBaseProps}
          value={props.value}
          desc={intl.formatMessage({
            id: "settings." + props.option + ".description"
          })}
          patternInfo={props.patternInfo}
          dflt={props.dflt}
          list={list}
        />
      );
    case "only":
      return (
        <OnlyOption
          {...optionBaseProps}
          value="false"
          desc={intl.formatMessage({
            id: "settings." + props.option + ".description"
          })}
          patternInfo={props.patternInfo}
        />
      );
    default:
      if (
        typeof props.config.pct !== "undefined" ||
        typeof props.config.deg !== "undefined" ||
        typeof props.config.mm !== "undefined" ||
        typeof props.config.count !== "undefined"
      ) {
        let factor, type, dflt;
        if (typeof props.config.pct !== "undefined") {
          type = "pct";
          factor = 100;
        } else factor = 1;
        if (typeof props.config.mm !== "undefined") type = "mm";
        if (typeof props.config.deg !== "undefined") type = "deg";
        if (typeof props.config.count !== "undefined") type = "count";
        dflt = props.config[type];
        return (
          <SliderOption
            {...optionBaseProps}
            config={props.config}
            value={props.value * factor}
            desc={optionDesc(props.option, props.pattern, props.language)}
            type={type}
            dflt={dflt}
            factor={factor}
            mm={typeof props.config.mm !== "undefined" ? true : false}
          />
        );
      } else if (typeof props.config.list !== "undefined") {
        let list = {};
        for (let entry of props.config.list)
          list[entry] = (
            <FormattedMessage
              id={`options.${props.pattern}.${props.option}.options.${entry}`}
            />
          );
        return (
          <ListOption
            {...optionBaseProps}
            value={props.value}
            desc={optionDesc(props.option, props.pattern, props.language)}
            patternInfo={props.patternInfo}
            dflt={props.dflt}
            list={list}
          />
        );
      } else if (typeof props.config.bool !== "undefined") {
        return (
          <BoolOption
            {...optionBaseProps}
            value={props.value === true ? "true" : "false"}
            desc={optionDesc(props.option, props.pattern, props.language)}
            dflt={props.dflt}
          />
        );
      } else return <p>FIXME: Unknown option format</p>;
  }
};

export default injectIntl(OptionContainer);

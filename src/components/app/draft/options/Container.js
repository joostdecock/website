import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { optionDesc } from "../../../../utils";
import SliderOption from "./Slider";
import SeamAllowanceOption from "./SeamAllowance";
import OnlyOption from "./Only";
import BoolOption from "./Bool";
import ListOption from "./List";
import i18nConfig from "../../../../config/i18n";

const OptionContainer = props => {
  let { intl } = props;
  switch (props.option) {
    case "paperless":
    case "complete":
      return (
        <BoolOption
          option={props.option}
          intl={intl}
          value={props.value === true ? "true" : "false"}
          updateOption={props.updateOption}
          showDocs={props.showDocs}
          docs={props.docs}
          desc={intl.formatMessage({
            id: "settings." + props.option + ".description"
          })}
          dflt={props.dflt}
        />
      );
    case "sa":
      return (
        <SeamAllowanceOption
          intl={intl}
          value="false"
          updateOption={props.updateOption}
          showDocs={props.showDocs}
          docs={props.docs}
          desc={intl.formatMessage({
            id: "settings." + props.option + ".description"
          })}
          patternInfo={props.patternInfo}
          units={props.units}
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
          option={props.option}
          intl={intl}
          value={props.value}
          updateOption={props.updateOption}
          showDocs={props.showDocs}
          docs={props.docs}
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
          intl={intl}
          value="false"
          updateOption={props.updateOption}
          showDocs={props.showDocs}
          docs={props.docs}
          desc={intl.formatMessage({
            id: "settings." + props.option + ".description"
          })}
          patternInfo={props.patternInfo}
        />
      );
    case "margin":
      return (
        <SliderOption
          option={props.option}
          intl={intl}
          value={props.value}
          updateOption={props.updateOption}
          showDocs={props.showDocs}
          docs={props.docs}
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
            config={props.config}
            option={props.option}
            value={props.value * factor}
            updateOption={props.updateOption}
            showDocs={props.showDocs}
            docs={props.docs}
            desc={optionDesc(props.option, props.pattern, props.language)}
            type={type}
            dflt={dflt}
            factor={factor}
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
            option={props.option}
            intl={intl}
            value={props.value}
            updateOption={props.updateOption}
            showDocs={props.showDocs}
            docs={props.docs}
            desc={optionDesc(props.option, props.pattern, props.language)}
            patternInfo={props.patternInfo}
            dflt={props.dflt}
            list={list}
          />
        );
      } else if (typeof props.config.bool !== "undefined") {
        return (
          <BoolOption
            option={props.option}
            intl={intl}
            value={props.value === true ? "true" : "false"}
            updateOption={props.updateOption}
            showDocs={props.showDocs}
            docs={props.docs}
            desc={optionDesc(props.option, props.pattern, props.language)}
            dflt={props.dflt}
          />
        );
      } else return <p>FIXME: Unknown option format</p>;
  }
};

export default injectIntl(OptionContainer);

import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { optionDesc } from "../../../../utils";
import PercentageOption from "./Percentage";
//import MillimeterOption from "./Millimeter";
import PaperlessOption from "./Paperless";
import SeamAllowanceOption from "./SeamAllowance";
import UnitsOption from "./Units";
import OnlyOption from "./Only";
import BoolOption from "./Bool";
import ListOption from "./List";
import i18nConfig from "../../../../config/i18n";

const OptionContainer = props => {
  let { intl } = props;
  const noYes = [
    <FormattedMessage id="app.no" />,
    <FormattedMessage id="app.yes" />
  ];
  //const baseProps = {
  //  option={props.option}
  //  intl={intl}
  //  value={props.value}
  //  updateOption={props.updateOption}
  //  showDocs={props.showDocs}
  //  docs={props.docs}
  //  desc={optionDesc(props.option, props.pattern, props.language)}
  //  patternInfo={props.patternInfo}
  //  dflt={props.dflt}
  //}
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
          desc={optionDesc(props.option, props.pattern, props.language)}
          labels={noYes}
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
          desc={optionDesc("sa", props.pattern, props.language)}
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
          desc={optionDesc(props.option, props.pattern, props.language)}
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
          desc={optionDesc(props.option, props.pattern, props.language)}
          patternInfo={props.patternInfo}
        />
      );
    case "margin":
      return (
        <PercentageOption
          option={props.option}
          intl={intl}
          value={props.value}
          updateOption={props.updateOption}
          showDocs={props.showDocs}
          docs={props.docs}
          desc={optionDesc(props.option, props.pattern, props.language)}
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
        typeof props.config.mm !== "undefined"
      ) {
        let factor = 100;
        let mm = false;
        let dflt;
        if (typeof props.config.mm !== "undefined") {
          factor = 1;
          mm = true;
          dflt = props.config.mm;
        } else dflt = props.config.pct;
        return (
          <PercentageOption
            config={props.config}
            option={props.option}
            value={props.value * factor}
            updateOption={props.updateOption}
            showDocs={props.showDocs}
            docs={props.docs}
            desc={optionDesc(props.option, props.pattern, props.language)}
            mm={mm}
            dflt={dflt}
          />
        );
      } else return <p>FIXME: Unknown option format</p>;
  }
};

export default injectIntl(OptionContainer);

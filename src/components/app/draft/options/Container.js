import React from "react";
import { optionDesc } from "../../../../utils";
import PercentageOption from "./Percentage";

const OptionContainer = props => {
  if (typeof props.config.pct !== "undefined")
    return (
      <PercentageOption
        config={props.config}
        option={props.option}
        value={props.value * 100}
        updateOption={props.updateOption}
        showDocs={props.showDocs}
        docs={props.docs}
        desc={optionDesc(props.option, props.pattern, props.language)}
      />
    );
  else return <p>FIXME: Unknown option format</p>;
};

export default OptionContainer;

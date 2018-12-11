import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { optionDesc } from "../../../../utils";
import PercentageOption from "./Percentage";

class OptionContainer extends React.Component {
  state = {};

  componentDidCatch(error, info) {
    console.log("Caught error", error, info);
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    let optionConfig = <p>FIXME: Unknown option format</p>;
    if (typeof this.props.config.pct !== "undefined")
      optionConfig = <PercentageOption {...this.props} />;
    return (
      <div className="option-wrapper">
        {optionConfig}
        <p className="mt1">
          <small>
            <FormattedMessage
              id={optionDesc(
                this.props.option,
                this.props.pattern.config.name,
                this.props.language
              )}
            />
          </small>
        </p>
      </div>
    );
  }
}

export default injectIntl(OptionContainer);

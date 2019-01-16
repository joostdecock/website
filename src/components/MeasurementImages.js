import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MeasurementImage from "./MeasurementImage";
import images from "../assets/images/measurements";

class MeasurementImages extends React.Component {
  state = {
    tab: 0
  };

  toggleTab = event => {
    this.setState({ tab: this.state.tab === 0 ? 1 : 0 });
  };

  render() {
    if (
      typeof images.withoutBreasts.measurements[this.props.measurement] ===
      "undefined"
    )
      return (
        <MeasurementImage
          measurement={this.props.measurement}
          breasts={true}
          className={this.props.className}
        />
      );
    else
      return (
        <div>
          <Tabs
            value={this.state.tab}
            onChange={this.toggleTab}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab
              label={this.props.intl.formatMessage({ id: "app.withBreasts" })}
            />
            <Tab
              label={this.props.intl.formatMessage({
                id: "app.withoutBreasts"
              })}
            />
          </Tabs>
          <MeasurementImage
            measurement={this.props.measurement}
            breasts={this.state.tab === 0 ? true : false}
            className={this.props.className}
          />
        </div>
      );
  }
}

MeasurementImages.propTypes = {
  measurement: PropTypes.string.required,
  className: PropTypes.string
};

MeasurementImages.defaultProps = {
  measurement: "chestcircumference",
  className: ""
};

export default injectIntl(MeasurementImages);

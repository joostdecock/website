import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import images from "../assets/images/measurements";

const MeasurementImage = props => {
  const type = images["with" + (props.breasts ? "Breasts" : "outBreasts")];
  const img = type.measurements[props.measurement];
  let pose = "standing";
  if (type.seated.indexOf(props.measurement) !== -1) pose = "seated";
  const bg = type.bg[pose];
  return (
    <img
      src={img}
      alt={props.intl.formatMessage({
        id: "measurements." + props.measurement
      })}
      className={props.className}
      style={{
        backgroundImage: `url('${bg}')`,
        backgroundSize: "cover"
      }}
    />
  );
};

MeasurementImage.propTypes = {
  breasts: PropTypes.bool,
  measurement: PropTypes.string,
  className: PropTypes.string
};

MeasurementImage.defaultProps = {
  breasts: true,
  measurement: "chestcircumference",
  className: ""
};

export default injectIntl(MeasurementImage);

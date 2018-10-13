import React from "react";
import PropTypes from "prop-types";
import MobileSubMenuItem from "./MobileSubMenuItem";
import { FormattedMessage } from "react-intl";

const MobileSubMenu = props => {
  let label = "";
  if (typeof props.text === "string") {
    label = props.text;
  } else {
    label = <FormattedMessage id={props.label} />;
  }

  return (
    <div>
      <h3>{label}</h3>
      {props.items.map((item, index) => (
        <MobileSubMenuItem
          key={item.label + "__" + index}
          onClick={props.handleClick}
          selected={false}
          {...item}
        />
      ))}
    </div>
  );
};

MobileSubMenu.propTypes = {
  type: PropTypes.string.isRequired
};

MobileSubMenu.defaultProps = {
  type: "warning"
};

export default MobileSubMenu;

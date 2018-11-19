import React from "react";
import PropTypes from "prop-types";
import MobileSubMenuItem from "./MobileSubMenuItem";
import { FormattedMessage } from "react-intl";
import MenuItem from "@material-ui/core/MenuItem";

const MobileSubMenu = props => {
  let label = "";
  if (typeof props.text === "string") {
    label = props.text;
  } else {
    label = <FormattedMessage id={props.label} />;
  }

  return (
    <div>
      <hr />
      <MenuItem key="subheading" button={false} title={label} color="secondary">
        <b>{label}</b>
      </MenuItem>
      {props.items.map((item, index) => {
        if (item === "divider")
          return <hr key={"divider" + index} className="divider" />;
        return (
          <MobileSubMenuItem
            key={item.label + "__" + index}
            onClick={props.handleClick}
            intl={props.intl}
            selected={false}
            divider={item === "divider" ? true : false}
            {...item}
          />
        );
      })}
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

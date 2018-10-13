import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import { FormattedMessage } from "react-intl";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const MobileSubMenuItem = props => {
  let icon = "";
  let label = "";
  let link = "";
  if (typeof props.text === "string") {
    label = <ListItemText>{props.text}</ListItemText>;
  } else {
    label = (
      <ListItemText>
        <FormattedMessage id={props.label} />
      </ListItemText>
    );
  }
  if (typeof props.icon === "string") {
    icon = (
      <ListItemIcon>
        <Icon className="enu-icon">{props.icon}</Icon>
      </ListItemIcon>
    );
  } else if (props.icon.type === "inline") {
    icon = (
      <div
        style={{ display: "inline-block", paddingRight: "10px" }}
        dangerouslySetInnerHTML={{ __html: props.icon.svg }}
      />
    );
  } else if (props.icon.type === "component") {
    icon = <ListItemIcon>{props.icon.svg}</ListItemIcon>;
  }
  if (props.link.substring(0, 4) === "http") link = { href: props.link };
  else link = { href: props.link };
  return (
    <MenuItem
      key={"sdfs" + props.label}
      button={true}
      component="a"
      {...link}
      onClick={event => props.onClick(event, props.label)}
      color="secondary"
    >
      {icon}
      {label}
    </MenuItem>
  );
};

MobileSubMenuItem.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  link: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.string
};

MobileSubMenuItem.defaultProps = {
  selected: false
};

export default MobileSubMenuItem;

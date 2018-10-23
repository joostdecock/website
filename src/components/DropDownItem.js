import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import { FormattedMessage } from "react-intl";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const DropDownItem = props => {
  let icon = "";
  let label = "";
  let link = {};
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
      <ListItemIcon className="inherit-color">
        <Icon>{props.icon}</Icon>
      </ListItemIcon>
    );
  } else if (props.icon.type === "inline") {
    icon = (
      <div
        style={{
          display: "inline-block",
          paddingRight: "10px",
          color: "inherit"
        }}
        dangerouslySetInnerHTML={{ __html: props.icon.svg }}
      />
    );
  } else if (props.icon.type === "component") {
    icon = (
      <ListItemIcon color="inherit" className="inherit-color">
        {props.icon.svg}
      </ListItemIcon>
    );
  }
  // Some items have no link, but only an onClick action
  if (typeof props.link !== "undefined") {
    if (props.link.substring(0, 4) === "http") link = { href: props.link };
    else link = { href: props.link };
  }
  return (
    <MenuItem
      key={"sdfs" + props.label}
      button={true}
      component="a"
      {...link}
      onClick={event => props.onClick(event, props.label)}
    >
      {icon}
      {label}
    </MenuItem>
  );
};

DropDownItem.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  link: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.string
};

DropDownItem.defaultProps = {
  selected: false
};

export default DropDownItem;

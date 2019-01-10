import React from "react";
import TrayTitle from "./TrayTitle";
import TrayFooter from "./TrayFooter";
import InfoIcon from "@material-ui/icons/Info";
import ExpandIcon from "@material-ui/icons/ArrowDropDown";
import CollapseIcon from "@material-ui/icons/ArrowDropUp";
import IconButton from "@material-ui/core/IconButton";

const Drawer = props => (
  <div
    className={
      (props.open ? "force-expanded" : "force-collapsed") + " tray shadow1 mb1"
    }
  >
    <TrayTitle icon={props.icon}>
      {props.title}
      <IconButton className="traytoggle expand" onClick={props.toggleOpen}>
        <ExpandIcon className="traytoggle" />
      </IconButton>
      <IconButton className="traytoggle collapse" onClick={props.toggleOpen}>
        <CollapseIcon className="traytoggle" />
      </IconButton>
    </TrayTitle>
    {props.open ? (
      <div className="content">
        {props.children}
        <TrayFooter>{props.footer}</TrayFooter>
      </div>
    ) : (
      ""
    )}
  </div>
);

Drawer.defaultProps = {
  icon: <InfoIcon />,
  footer: "",
  title: ""
};

export default Drawer;

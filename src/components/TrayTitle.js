import React from "react";

export default props => (
  <h3 className={"tray-title " + (props.className || "")}>
    <span className="tray-title-icon">{props.icon}</span>
    {props.children}
  </h3>
);

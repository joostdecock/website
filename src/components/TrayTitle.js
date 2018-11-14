import React from "react";

export default props => (
  <div className={"tray-title " + (props.className || "")}>
    <h3>
      {props.icon}
      {props.children}
    </h3>
  </div>
);

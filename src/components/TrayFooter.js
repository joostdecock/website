import React from "react";

export default props => (
  <div className={"tray-footer " + (props.className || "")}>
    {props.children}
  </div>
);

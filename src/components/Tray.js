import React from "react";

function Tray(props) {
  return (
    <div className={"tray shadow1 " + props.className}>{props.children}</div>
  );
}

export default Tray;

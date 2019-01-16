import React from "react";

const ButtonBar = props => {
  let classes = "buttonbar " + props.className;
  if (typeof props.reverse !== "undefined") classes += " reverse";
  return <div className={classes}>{props.children}</div>;
};

export default ButtonBar;

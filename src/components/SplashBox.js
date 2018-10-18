import React from "react";

const SplashBox = props => {
  return (
    <div className="splash-wrapper">
      <div className="splash-box txt-center">{props.children}</div>
    </div>
  );
};

export default SplashBox;

import React from "react";

const Center = ({ children }) => {
  const style = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    content: {}
  };
  return (
    <div style={style.wrapper}>
      <div className="center-flex-content">{children}</div>
    </div>
  );
};

export default Center;

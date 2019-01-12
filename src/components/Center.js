import React from "react";

const Center = ({ children, maxWidth }) => {
  const style = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    content: {
      flex: 1
    }
  };
  if (typeof maxWidth === "number") style.content.maxWidth = maxWidth;
  return (
    <div style={style.wrapper}>
      <div style={style.content}>{children}</div>
    </div>
  );
};

export default Center;

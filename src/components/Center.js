import React from "react";

const Center = ({ children }) => {
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
  return (
    <div style={style.wrapper}>
      <div style={style.content}>{children}</div>
    </div>
  );
};

export default Center;

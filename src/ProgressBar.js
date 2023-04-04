import React, { memo } from "react";
import "./App.css";

const ProgressBar = memo((props) => {

  return (
    <div
      style={{
        width: `${props.targets}%`,
        height: "1px",
        backgroundColor: "white",
        transition: "all 1s",
      }}
    ></div>
  );
});

export default ProgressBar;

import React from "react";
import "./App.css";
import PollContainer from "./PollContainer.js";

const Container = () => {
  return (


    <div className="container">
      <PollContainer pollID={3} />
    </div>
  );
};

export default Container;

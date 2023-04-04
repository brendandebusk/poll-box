import React, { useState, useCallback } from "react";
import "./App.css";

const PollEntryView = (props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [userChoice, setUserChoice] = useState(null);

  const radioChanged = useCallback((e) => {
    setIsDisabled(false);
    setUserChoice(e.target.value);
  },[]);

  const handleSubmission = useCallback((e) => {
    e.preventDefault();
    props.submissionCallback(userChoice);
  },[props, userChoice])

  return (
    <div className="pollEntryView">
      <h1>{props.question}</h1>
      <div className="pollEntryViewBreak"></div>

      <form onSubmit={(e) => handleSubmission(e)}>
        {props.options.map((v,i) => (
          <div key={i} className="pollEntryViewItem">
            <input
              type="radio"
              value={v.option_id}
              className="pollEntryViewRadio--input"
              name="poll"
              onChange={(e) => radioChanged(e)}
            />

            <div className="pollEntryViewLabel">{v.option_name}</div>
          </div>
        ))}

        <div className="pollEntryViewButtonContainer">
          <button
            type="submit"
            className="pollEntryViewAnswer"
            disabled={isDisabled}
          >
            Answer
          </button>
          <div
            className="pollEntryViewSeeResults"
            onClick={() => props.resultsCallback()}
          >
            See results ❯
          </div>
        </div>
      </form>
    </div>
  );
};

export default PollEntryView;

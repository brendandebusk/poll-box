import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import ProgressBar from "./ProgressBar.js";

const PollResultsView = (props) => {
  const [targetPercentageArray, setTargetPercentageArray] = useState(props.emptyTargets);
  const [optionsData, setOptionsData] = useState(props.options);
  // eslint-disable-next-line
  const [key, setKey] = useState(null);

  const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const rollNumbers = useCallback(async () => {
    const interval = 10;
    const transitionTime = 1000;

    let optionsDataCache = props.options;

    for (let i = 0; i < interval + 1; i++) {

      optionsDataCache.forEach((v) => {
        v.percentage = (v.targetPercentage / interval) * i;
      });

      setOptionsData(optionsDataCache);
      setKey(optionsDataCache[0].percentage);

      await delay(transitionTime / interval);
      
    }
  }, [props.options]);

  const moveBars = useCallback(async () => {
    await delay(100);

    setTargetPercentageArray(props.targets)

  },[props.targets])

  useEffect(() => {
    console.log("results render");

    rollNumbers();
    moveBars();

  }, [rollNumbers, moveBars]);

  return (
    <div className="pollEntryView">
      <h1>{props.question}</h1>
      <div className="pollEntryViewBreak"></div>

      <form>
        {optionsData.map((v, i) => (
          <div key={i} className="pollEntryViewItem">
            <input
              type="radio"
              value={v.option_id}
              className="pollEntryViewRadio--input"
              name="poll"
              // eslint-disable-next-line
              checked={props.choice == v.option_id ? true : false}
              disabled={true}
            />

            <div className="labelContainer">
              <div className="pollEntryViewLabel--results">{v.option_name}</div>
              <ProgressBar targets={targetPercentageArray[i]} />
            </div>

            <div className='percentage'>{v.percentage.toFixed(1)}%</div>
          </div>
        ))}

        <div className="pollEntryViewButtonContainer">
          Thank you! 🎉
          <div className="pollResultsViewTotal">{props.totalVotes} votes</div>
        </div>
      </form>
    </div>
  );
};

export default PollResultsView;

import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import PollEntryView from "./PollEntryView.js";
import PollResultsView from "./PollResultsView.js";
import { putData } from "./hooks/putData.js";

const PollViewManager = (props) => {
  const [showResults, setShowResults] = useState(false);
  const [optionsData, setOptionsData] = useState(props.options);
  const [totalVotes, setTotalVotes] = useState(0);
  const [choice, setChoice] = useState(null);
  const [targetPercentageArray, setTargetPercentageArray] = useState(null);
  const [emptyTargetArray, setEmptyTargetArray] = useState(null);

  // const delay = (time) => {
  //   return new Promise((resolve) => setTimeout(resolve, time));
  // };

  const changeView = useCallback(async () => {
    setShowResults(true);
  }, [setShowResults]);

  const prepareView = useCallback(
    (data) => {
      let optionsDataCache = optionsData;
      let totalVotesCache = totalVotes;
      let objectID = null;
      let objectVotes = 0;
      let targetPercentageArrayCache = [];
      let emptyTargetArrayCache = [];

      if (data) {
        totalVotesCache = 0;
      }

      optionsDataCache.forEach((v) => {
        // eslint-disable-next-line
        if (data == v.option_id) {
          v.option_votes++;
          objectID = v._id;
          objectVotes = v.option_votes;
          return;
        }
      });

      optionsDataCache.forEach((v) => {
        totalVotesCache = totalVotesCache + v.option_votes;
      });

      optionsDataCache.forEach((v) => {
        v.targetPercentage = 100 * (v.option_votes / totalVotesCache);
        targetPercentageArrayCache.push(
          100 * (v.option_votes / totalVotesCache)
        );
        emptyTargetArrayCache.push(0);
        v.percentage = 0;
      });

      setEmptyTargetArray(emptyTargetArrayCache);
      setTargetPercentageArray(targetPercentageArrayCache);
      setOptionsData(optionsDataCache);
      setTotalVotes(totalVotesCache);

      //v.percentage = what displays

      if (data) {
        setChoice(data);
        changeView();
        putData(objectID, objectVotes);
      }
    },
    [changeView, optionsData, totalVotes]
  );

  useEffect(() => {
    console.log("view initial load");

    prepareView();

    // eslint-disable-next-line
  }, [props.options]);

  // eslint-disable-next-line
  const handleSubmission = useCallback((data) => {
    console.log("handling submission");

    prepareView(data);
  });

  return (
    <div className="pollViewManager">
      {showResults ? (
        <PollResultsView
          question={props.question}
          options={optionsData}
          totalVotes={totalVotes}
          choice={choice}
          targets={targetPercentageArray}
          emptyTargets={emptyTargetArray}
        />
      ) : (
        <PollEntryView
          resultsCallback={() => changeView()}
          question={props.question}
          options={optionsData}
          submissionCallback={(data) => handleSubmission(data)}
        />
      )}
    </div>
  );
};

export default PollViewManager;


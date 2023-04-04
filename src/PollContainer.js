import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import PollViewManager from "./PollViewManager.js";
import { getData } from "./hooks/getData.js";
import BarLoader from "react-spinners/BarLoader.js";

const PollContainer = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const data = useRef(null);
  const pollQuestion = useRef(null);
  const pollOptions = useRef([]);
  const [error, setError] = useState(false);

  const parseData = useCallback(() => {
    data.current.pollQuestionsResponse.forEach((v) => {
      if (v.poll_id === props.pollID) {
        pollQuestion.current = v.poll_question;
        return;
      }
    });

    data.current.pollOptionsResponse.forEach((v) => {
      if (v.poll_id === props.pollID) {
        pollOptions.current.push(v);
        return;
      }
    });

    if (pollQuestion.current === null) {
      console.log("bad poll id");
      setIsLoading(true);
      setError(true);
    }
  }, [props.pollID]);

  const loadData = useCallback(async () => {
    console.log("checking data");
    if (data.current === null && isLoading) {
      try {
        data.current = await getData();
        setIsLoading(false);
        parseData();
      } catch (error) {
        console.log(error);
        setError(true);
      }
    }
  }, [isLoading, parseData]);

  useEffect(() => {
    console.log("starting poll module");
    loadData();
  });

  return (
    <div className="pollbox">
      {isLoading ? (
        <div>
          {error ? (
            <div className="loadingView">
              An error has occured. Please refresh the page and try again.
            </div>
          ) : (
            <div className="loadingView">
              <div>Loading poll...</div>
              <BarLoader color="#FFFFFF" width={175} loading={isLoading} />
            </div>
          )}
        </div>
      ) : (
        <PollViewManager
          question={pollQuestion.current}
          options={pollOptions.current}
          pollID={props.pollID}
        />
      )}
    </div>
  );
};

export default PollContainer;

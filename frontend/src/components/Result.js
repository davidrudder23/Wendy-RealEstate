import React from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "../state/updateState";
import { useHistory } from "react-router-dom";

const Result = props => {
  const { state } = useStateMachine(updateAction);
  const { push } = useHistory();

  return (
    <div className="container">
      <h2>Result</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => push("/")} >Back</button>
    </div>
  );
};

export default Result;

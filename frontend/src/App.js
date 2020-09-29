import React from 'react';
import { StateMachineProvider, createStore } from "little-state-machine";
import { DevTool } from "little-state-machine-devtools";
import Route from "./components/Routes";

createStore({
  details: {}
});

function App() {
  return (
    <StateMachineProvider>
      <DevTool />
      <Route />
    </StateMachineProvider>
  );
}

export default App;

import React from 'react';
import AgentFormOne from "./components/AgentFormOne";
// import AgentFormTwo from "./components/AgentFormTwo";
import Result from "./components/Result";
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import { StateMachineProvider, createStore } from "little-state-machine";
import { DevTool } from "little-state-machine-devtools";

createStore({
  details: {}
});

function App() {
  return (
    <StateMachineProvider>
      <DevTool />
      <Router>
        <Route exact path="/" component={AgentFormOne} />
        <Route path="/result" component={Result} />
      </Router>
    </StateMachineProvider>
  );
}

export default App;

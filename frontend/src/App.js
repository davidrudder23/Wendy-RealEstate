import React from 'react';
// import BuyerFormOne from "./components/BuyerFormTwo";
import BuyerFormTwo from "./components/BuyersForm/BuyerFormTwo";
import BuyerFormThree from "./components/BuyersForm/BuyerFormThree";
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
        {/* <Route exact path="/" component={BuyerFormOne} /> */}
        <Route exact path="/" component={BuyerFormTwo} />
        <Route path="/BT3" component={BuyerFormThree} />
        <Route path="/result" component={Result} />
      </Router>
    </StateMachineProvider>
  );
}

export default App;

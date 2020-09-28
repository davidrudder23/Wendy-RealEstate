import React from 'react';
import General from "./components/BuyersForm/General";
import BuyerAgent from "./components/BuyersForm/Agent";
import Result from "./components/Result";
import ListingBroker from "./components/BuyersForm/ListingBroker";
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import { StateMachineProvider, createStore } from "little-state-machine";
import { DevTool } from "little-state-machine-devtools";
import Attorney from './components/BuyersForm/Attorney';
import ForSaleByOwner from './components/BuyersForm/ForSaleByOwner';

createStore({
  details: {}
});

function App() {
  return (
    <StateMachineProvider>
      <DevTool />
      <Router>
        <Route exact path="/" component={General} />
        <Route path="/BuyerAgent" component={BuyerAgent} />
        <Route path="/BuyerAttorney" component={Attorney} />
        <Route path="/FSBO" component={ForSaleByOwner} />
        <Route path="/ListingBroker" component={ListingBroker} />
        <Route path="/result" component={Result} />
      </Router>
    </StateMachineProvider>
  );
}

export default App;

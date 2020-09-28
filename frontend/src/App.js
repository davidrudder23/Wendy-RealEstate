import React from 'react';
import Property from "./components/Forms/Property";
import BuyerAgent from "./components/Forms/Agent";
import Result from "./components/Result";
import ListingBroker from "./components/Forms/ListingBroker";
import Lenders from "./components/Forms/Lenders";
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import { StateMachineProvider, createStore } from "little-state-machine";
import { DevTool } from "little-state-machine-devtools";
import Attorney from './components/Forms/Attorney';
import ForSaleByOwner from './components/Forms/ForSaleByOwner';

createStore({
  details: {}
});

function App() {
  return (
    <StateMachineProvider>
      <DevTool />
      <Router>
        <Route exact path="/Property" component={Property} />
        <Route path="/BuyerAgent" component={BuyerAgent} />
        <Route path="/BuyerAttorney" component={Attorney} />
        <Route path="/FSBO" component={ForSaleByOwner} />
        <Route path="/ListingBroker" component={ListingBroker} />
        <Route path="/Lenders" component={Lenders} />
        <Route path="/result" component={Result} />
      </Router>
    </StateMachineProvider>
  );
}

export default App;

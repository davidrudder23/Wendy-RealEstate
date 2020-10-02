import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import Property from "../Forms/Property";
import BuyerAgent from "../Forms/BuyersAgent";
import Result from "../Result";
import ListingBroker from "../Forms/ListingBroker";
import Lenders from "../Forms/Lenders";
import Attorney from '../Forms/Attorney';
import ForSaleByOwner from '../Forms/ForSaleByOwner';
import Mortgage from "../Forms/Mortgage";
import AgentType from "../Forms/AgentType";
import AdditionalInformation from "../Forms/AdditionalInformation";
// import Testing from "../Forms/Testing";

const index = () => {
    return (
        <Router>
            <Route exact path="/" component={AgentType}/>
            <Route path="/Property" component={Property}/>
            <Route path="/BuyersAgent" component={BuyerAgent}/>
            <Route path="/BuyersAttorney" component={Attorney}/>
            <Route path="/FSBO" component={ForSaleByOwner}/>
            <Route path="/ListingBroker" component={ListingBroker}/>
            <Route path="/Lenders" component={Lenders} />
            <Route path="/result" component={Result} />
            <Route path="/Mortgage" component={Mortgage} />
            <Route path="/AdditionalInformation" component={AdditionalInformation} />
            {/* <Route path="/testing" component={Testing} /> */}
        </Router>
    )
}

export default index
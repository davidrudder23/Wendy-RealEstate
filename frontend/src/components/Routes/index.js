import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import Property from "../Forms/Property";
import Agent from "../Forms/Agent";
import Result from "../Result";
import ListingBroker from "../Forms/ListingBroker";
import Lenders from "../Forms/Lenders";
import Attorney from '../Forms/Attorney';
import ForSaleByOwner from '../Forms/ForSaleByOwner';
import Mortgage from "../Forms/Mortgage";
import AgentType from "../Forms/AgentType";
import AdditionalInformation from "../Forms/AdditionalInformation";
import Testing from "../Forms/Testing";
import Client from "../Forms/Client";

const index = () => {
    return (
        <Router>
            <Route exact path="/" component={AgentType}/>
            <Route path="/Client/:clientType" component={Client} />
            <Route path="/Property" component={Property} />
            <Route path="/Agent/:represents" component={Agent} />
            <Route path="/Attorney/:represents" component={Attorney} />
            <Route path="/FSBO" component={ForSaleByOwner} />
            <Route path="/ListingBroker" component={ListingBroker} />
            <Route path="/Lenders" component={Lenders} />
            <Route path="/result" component={Result} />
            <Route path="/Mortgage" component={Mortgage} />
            <Route path="/AdditionalInformation" component={AdditionalInformation} />
            <Route path="/Testing" component={Testing} />
        </Router>
    )
}

export default index

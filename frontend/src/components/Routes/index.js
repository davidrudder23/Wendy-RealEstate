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
import { handleDeploymentPath } from "../../shared";
import FinalPDF from "../Forms/FinalPDF";

const index = () => {
    return (
        <Router>
            <Route exact path={handleDeploymentPath("/")} component={AgentType} />
            <Route path={handleDeploymentPath("/Client/:clientType")} component={Client} />
            <Route path={handleDeploymentPath("/Property")} component={Property} />
            <Route path={handleDeploymentPath("/Agent/:represents")} component={Agent} />
            <Route path={handleDeploymentPath("/Attorney/:represents/:param1?")} component={Attorney} />
            <Route path={handleDeploymentPath("/FSBO")} component={ForSaleByOwner} />
            <Route path={handleDeploymentPath("/ListingBroker")} component={ListingBroker} />
            <Route path={handleDeploymentPath("/Lenders")} component={Lenders} />
            <Route path={handleDeploymentPath("/Mortgage")} component={Mortgage} />
            <Route path={handleDeploymentPath("/AdditionalInformation")} component={AdditionalInformation} />
            <Route path={handleDeploymentPath("/result")} component={Result} />
            <Route path={handleDeploymentPath("/Testing")} component={Testing} />
            <Route path={handleDeploymentPath("/PDF")} component={FinalPDF} />
        </Router>
    )
}

export default index

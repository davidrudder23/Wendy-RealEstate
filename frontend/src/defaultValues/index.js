import { PROPERTY_TYPES, AGENT_TYPES, MORTGAGE_TYPES } from "../shared";
/**
 * This file contains default values for testing
 * purposes for all of the pages and flows.
 */


export const propertyDefaultValues = (agentType) => {
    if(agentType === AGENT_TYPES.BUYERS){
    return {
        property: {
            propertyType: PROPERTY_TYPES.CONDO,
            deedReference: "0000-000000",
            mlsNumber: "0000000",
            address: "29 Draper Street, Springfield, MA, USA",
            condoManagementCompany: "George's Condo Company",
            dateHouseBuilt: "2021",
            titleOrTownSewer: "Title V",
            publicOrTownWater: "Town Water",
            buyerHasSubmittedAdditionalOffer: false,
            inspectionDeadline: "10/28/2020",
        }}
    }
}

export const mortgageDefaultValues = (agentType) => {
    if(agentType === AGENT_TYPES.BUYERS){
        return {
            mortgage: {
                typeOfMortgage: MORTGAGE_TYPES.CONVENTIONAL,
                purchasePrice: "200000",
                firstDeposit: "20000",
                secondDeposit: "",
                areConcessions: true,
                concessions: "Testing 1, 2",
                houseClosingDate: "10/28/2020",
                mortgageCommitmentDeadline: "10/28/2020",

            }
        }
    }
}

export const clientDefaultValues = (agentType) => {
    if(agentType === AGENT_TYPES.BUYERS){
        return {
            client: {
                Buyer: [{
                    firstName: "George",
                    lastName: "Colon",
                    email: "gcolon021@gmail.com",
                    emailVerification: "gcolon021@gmail.com",
                    phoneNumber: "4133560363",
                    address: "29 Draper street, Springfield, MA, USA",
                }]
            }
        }
    }
}

export const agentDefaultValues = (agentType) => {
    if(agentType === AGENT_TYPES.BUYERS){
        return {
            ...broker(agentType),
            ...agent(agentType),        
        }
    }
}

export const attorneyDefaultValues = (hasAttorney, wantsRecommendationAndIntroduction) => {
    return (agentType) => {
    if(agentType === AGENT_TYPES.BUYERS){
            return {
            attorney: {
                Buyer: {
                    hasAttorney: hasAttorney,
                    wantsRecommendationAndIntroduction: wantsRecommendationAndIntroduction,
                    name: "George Colon",
                    firmName: "George's Firm",
                    email: "gcolon021@gmail.com",
                    emailVerification: "gcolon021@gmail.com",
                    phoneNumber: "4133560363",
                    recommended: [{
                        name: "George",
                        firmName: "George's Firm"
                    },
                    {
                        name: "George",
                        firmName: "George's Firm"
                    },
                    {
                        name: "George",
                        firmName: "George's Firm"
                    }]
                }
            }
        }}
    }
}

const agent = (agentType) => {
    return {
        agent: {
            Buyer: {
                name: "George Colon", 
                MLSNumber: "cn226414", 
                email: "georgecolon2020@gmail.com", 
                emailVerification: "georgecolon2020@gmail.com",
                phoneNumber: "413-317-0029"
            }
        }
    }
}

const broker = (agentType) => {
    return {
        broker: {
            Buyer: {
                company: "George's Broker",
                address: "29 Draper Street, Springfield, MA, USA"
            }
        },      
    }
}
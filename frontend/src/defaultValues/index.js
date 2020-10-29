import { PROPERTY_TYPES, AGENT_TYPES, MORTGAGE_TYPES } from "../shared";
/**
 * This file contains default values for testing
 * purposes for all of the pages and flows.
 */


export const propertyDefaultValues = (agentType) => {
    if (agentType === AGENT_TYPES.BUYERS || agentType === AGENT_TYPES.SELLERS) {
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
                mapReferences: "00000000",
                vacentOrOccupied: "Vacant",
                loxBoxCode: "0123",
                buyerHasSubmittedAdditionalOffer: true
            }
        }
    }
}

export const mortgageDefaultValues = (agentType) => {
    if (agentType === AGENT_TYPES.BUYERS || agentType === AGENT_TYPES.SELLERS) {
        return {
            mortgage: {
                typeOfMortgage: MORTGAGE_TYPES.CONVENTIONAL,
                purchasePrice: "200000",
                firstDeposit: "20000",
                secondDeposit: "10000",
                areConcessions: true,
                concessions: "Testing 1, 2",
                houseClosingDate: "10/28/2020",
                mortgageCommitmentDeadline: "10/28/2020",
            }
        }
    }
}

export const clientDefaultValues = (clientType) => {
    return (agentType) => {
        return {
            client: {
                [clientType]: [{
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

export const agentDefaultValues = (represents) => {
    return (agentType) => {
        if (agentType === AGENT_TYPES.BUYERS || agentType === AGENT_TYPES.SELLERS) {
            return {
                ...broker(represents),
                ...agent(represents),
            }
        }
    }
}

export const attorneyDefaultValues = (represents, hasAttorney, wantsRecommendationAndIntroduction) => {
    return (agentType) => {
        if (agentType === AGENT_TYPES.BUYERS || agentType === AGENT_TYPES.SELLERS) {
            return {
                attorney: {
                    [represents]: {
                        ...attorney(agentType, hasAttorney, wantsRecommendationAndIntroduction),
                    }
                },
                [represents]: {
                    ...recommended_attorneys()
                }
            }
        }
    }
}

export const FSBODefaultValuesPage1 = (agentType) => {
    if (agentType === AGENT_TYPES.BUYERS) {
        return {
            client: {
                Seller: [
                    { ...client(agentType) },
                ]
            }
        }
    }
}

export const FSBODefaultValuesPage2 = (hasAttorney, wantsRecommendationAndIntroduction) => {
    return (agentType) => {
        if (agentType === AGENT_TYPES.BUYERS) {
            return {
                attorney: {
                    Seller: {
                        ...attorney(agentType, hasAttorney, wantsRecommendationAndIntroduction),
                    }
                },
                Seller: {
                    ...recommended_attorneys()
                }
            }
        }
    }
}

export const ListingBrokerDefaultValues = (agentType) => {
    if (agentType === AGENT_TYPES.BUYERS || agentType === AGENT_TYPES.SELLERS) {
        return {
            ...broker(AGENT_TYPES.SELLERS),
            ...agent(AGENT_TYPES.SELLERS),
        }
    }
}

export const LenderDefaultValues = (agentType) => {
    if (agentType === AGENT_TYPES.BUYERS) {
        return {
            lender: {
                phoneNumber: "413-356-0363",
                email: "gcolon021@gmail.com",
                emailVerification: "gcolon021@gmail.com",
                name: "George",
                organization: "George's Firm",

            }
        }
    }
}



const agent = (agentType) => {
    return {
        agent: {
            [agentType]: {
                name: "George Colon",
                MLSNumber: "cn226414",
                email: "georgecolon2020@gmail.com",
                emailVerification: "georgecolon2020@gmail.com",
                phoneNumber: "413-317-0029",
                agencyCompensationPerMLS: "0",
            }
        }
    }
}

const broker = (agentType) => {
    return {
        broker: {
            [agentType]: {
                company: "George's Broker",
                address: "29 Draper Street, Springfield, MA, USA"
            }
        },
    }
}

const client = (agentType) => {
    return {
        firstName: "George",
        lastName: "Colon",
        email: "gcolon021@gmail.com",
        emailVerification: "gcolon021@gmail.com",
        phoneNumber: "4133560363",
        address: "29 Draper street, Springfield, MA, USA",
    }
}

const attorney = (agentType, hasAttorney, wantsRecommendationAndIntroduction) => {
    return {
        hasAttorney: hasAttorney,
        wantsRecommendationAndIntroduction: wantsRecommendationAndIntroduction,
        name: "George Colon",
        firmName: "George's Firm",
        email: "gcolon021@gmail.com",
        emailVerification: "gcolon021@gmail.com",
        phoneNumber: "4133560363",
    }
}

const recommended_attorneys = () => {
    return {
        recommended_attorneys: [{
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
        }],
    }
}
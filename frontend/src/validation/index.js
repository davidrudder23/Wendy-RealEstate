import * as yup from "yup";
import { AGENT_TYPES, MORTGAGE_TYPES, PROPERTY_TYPES } from "../shared";

// This is used in lazy validation rules found here: https://github.com/jquense/yup/issues/130#issuecomment-578392176
const mapRules = (map, rule) => Object.keys(map).reduce((newMap, key) => ({...newMap, [key]: rule}), {});

// Regular Express to Verify phone numbers taken from: https://www.sitepoint.com/community/t/phone-number-regular-expression-validation/2204/4
const PHONE_REG_EXP = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const REQUIRED = "Required";
const NOT_REQUIRED = "Not Required"
const VALID_EMAIL = "Must be a Valid Email!";
const NUMBER_ERROR_MESSAGE = "Can only contain numbers";


export const AgentTypeValidation = (agentType) => yup.object().shape({
    agentType: yup.string().required(REQUIRED),
});

export const PropertyValidation = (agentType) => yup.object().shape({
    property: yup.object().shape({
        mapReferences: (agentType === AGENT_TYPES.SELLERS || agentType === AGENT_TYPES.BOTH) ?  yup.string().required(REQUIRED) : yup.string().notRequired(),
        deedReference: yup.string().required(REQUIRED).test('len', 'Must be in format XXXX-XXXXXXX', val => val.length === 11).required(REQUIRED),
        mlsNumber: yup.string().test('len', 'Must be exactly 7 characters', val => val.length === 7).required(REQUIRED),
        address: yup.string().required(REQUIRED),
        propertyType: yup.string().required(REQUIRED).oneOf([...Object.values(PROPERTY_TYPES)], "Select a valid Property type."),
        condoManagementCompany: yup.string()
        .when(
            "propertyType",
        { is: val => val === PROPERTY_TYPES.CONDO,
            then: yup.string().required(REQUIRED)
        }),
        vacentOrOccupied: agentType === AGENT_TYPES.SELLERS || agentType === AGENT_TYPES.BOTH ? yup.string().required(REQUIRED) : yup.string().notRequired(),
        dateHouseBuilt: yup.string().required(REQUIRED),
        titleOrTownSewer: yup.string().required(REQUIRED),
        publicOrTownWater: yup.string().required(REQUIRED),
        inspectionDeadline: yup.string().required(REQUIRED),
        buyerhasSubmittedAdditionalOffer: agentType === AGENT_TYPES.BUYERS || agentType === AGENT_TYPES.BOTH ? yup.string().notRequired() : yup.string().notRequired(),
        loxBoxCode: agentType === AGENT_TYPES.SELLERS || agentType === AGENT_TYPES.BOTH ? yup.number().required(REQUIRED).typeError(NUMBER_ERROR_MESSAGE) : yup.mixed().notRequired(),
})});

export const MortgageValidation = (agentType) => yup.object().shape({
    mortgage: yup.object().shape({
        typeOfMortgage: yup.string().required(REQUIRED),
        purchasePrice: yup.number().required(REQUIRED).typeError(NUMBER_ERROR_MESSAGE),
        firstDeposit: yup.number().required(REQUIRED).typeError(NUMBER_ERROR_MESSAGE),
        secondDeposit: yup.string().notRequired(NOT_REQUIRED),
        areConcessions: yup.string().notRequired(NOT_REQUIRED),
        concessions: yup.string()
        .when(
            "areConcessions",
            { is: val => val === true,
              then: yup.string().required(REQUIRED)
        }),
        mortgageCommitmentDeadline: yup.string().when(
            "typeOfMortgage",
            {
                is: val => val !== MORTGAGE_TYPES.CASH,
                then: yup.string().required(REQUIRED)
            }
        ),
        houseClosingDate: yup.string().required(REQUIRED),
    })
})


export const AttorneyValidation = (agentType) => yup.object().shape({
    attorney: yup.lazy(obj => yup.object(mapRules(obj, yup.object().shape({
        hasAttorney: yup.string().notRequired(),
        name: yup.string()
        .when(
            "hasAttorney",
            {
                is: val => val === true,
                then: yup.string().required(REQUIRED)
            }
        ),
        email: yup.string()
        .when(
            "hasAttorney",
            {
                is: val => val === true,
                then: yup.string().required(REQUIRED)
            }
        ),
        emailVerification: yup.string()
        .when(
            "hasAttorney",
            {
                is: val => val === true,
                then: yup.string().email(VALID_EMAIL).required(REQUIRED).oneOf([yup.ref('email'), null], "Email Addresses Must Match"),
            }
        ),
        firmName: yup.string().notRequired(NOT_REQUIRED),
        phoneNumber: yup.string().notRequired(NOT_REQUIRED),
        wantsRecommendationAndIntroduction: yup.string().notRequired(NOT_REQUIRED),
        recommended: yup.string()
        .when(
            "wantsRecommendationAndIntroduction",
            {
                is: val => val === true,
                then: yup.array().of(
                    yup.object().shape({
                        name: yup.string().notRequired(),
                        firmName: yup.string().notRequired()
                    })
                )
            }
        ) 
    }))))
})

export const FSBOClientValidation = (agentType) => yup.object().shape({
    FSBO: yup.object().shape({
        isForSaleByOwner: yup.boolean().notRequired(),
    }),
    client: yup.object().shape()
    .when(
        "FSBO.isForSaleByOwner",
        {
            is: val => val === true,
            then: yup.lazy(obj => {
                return yup.object(mapRules(obj, yup.lazy(obj2 => {
                if(Array.isArray(obj2)){
                    return yup.array().of(yup.object().shape({
                    firstName: yup.string().required(REQUIRED),
                    lastName: yup.string().required(REQUIRED),
                    address: yup.string().required(REQUIRED),
                    phoneNumber: yup.string().required(REQUIRED).matches(PHONE_REG_EXP, 'This is not a valid phone number.'),
                    email: yup.string().email(VALID_EMAIL).required(REQUIRED),
                    emailVerification: yup.string().email(VALID_EMAIL).required(REQUIRED).oneOf([yup.ref('email'), null], "Email Addresses Must Match"), 
                }));
                }
                return yup.mixed().notRequired(NOT_REQUIRED).nullable();
            })))}),
        }
    )
});

export const BrokerValidation = (agentType) => yup.object().shape({
    broker: yup.lazy(obj => yup.object(mapRules(obj, yup.object().shape({
        address: yup.string().required(REQUIRED),
        company: yup.string().required(REQUIRED),
    }))))
});

export const ListingBrokerValidation = (agentType) => yup.object().shape({
    broker: yup.lazy(obj => yup.object(mapRules(obj, yup.object().shape({
        address: yup.string().required(REQUIRED),
        company: yup.string().required(REQUIRED),
    })))),
    agent: yup.object().shape({
        Seller: yup.object().shape({
            name: yup.string().required(REQUIRED),
            email: yup.string().email(VALID_EMAIL).required(REQUIRED),
            emailVerification: yup.string().email(VALID_EMAIL).required(REQUIRED).oneOf([yup.ref('email'), null], "Email Addresses Must Match"),
            phoneNumber: yup.string().required(REQUIRED),
            MLSNumber: agentType === AGENT_TYPES.SELLERS || agentType === AGENT_TYPES.BOTH ? yup.string().required(REQUIRED) : yup.mixed().notRequired(NOT_REQUIRED)
        }),
    })
});

export const LendersValidation = (agentType) => yup.object().shape({
    lender: yup.object().shape({
        organization: yup.string().required(REQUIRED),
        name: yup.string().required(REQUIRED),
        companyName: yup.string().notRequired(REQUIRED),
        phoneNumber: yup.string().required(REQUIRED).matches(PHONE_REG_EXP, 'This is not a valid phone number.'),
        email: yup.string().email(VALID_EMAIL).required(REQUIRED),
        emailVerification: yup.string().email(VALID_EMAIL).required(REQUIRED).oneOf([yup.ref('email'), null], "Email Addresses Must Match"), 
    }),
});

export const AdditionalInformationValidation = (agentType) => yup.object().shape({

});

/* 
    This object validation rule can be utilized to define a lazy array
*/
export const ClientValidation = (agentType) => yup.object().shape({
    client: yup.lazy(obj => {     
                    return yup.object(mapRules(obj, yup.lazy(obj2 => {
                    if(Array.isArray(obj2)){
                        return yup.array().of(yup.object().shape({
                        firstName: yup.string().required(REQUIRED),
                        lastName: yup.string().required(REQUIRED),
                        address: yup.string().required(REQUIRED),
                        phoneNumber: yup.string().required(REQUIRED).matches(PHONE_REG_EXP, 'This is not a valid phone number.'),
                        email: yup.string().email(VALID_EMAIL).required(REQUIRED),
                        emailVerification: yup.string().email(VALID_EMAIL).required(REQUIRED).oneOf([yup.ref('email'), null], "Email Addresses Must Match"), 
                    }));
                    }
                    return yup.mixed().notRequired(NOT_REQUIRED).nullable();
                }
            )
        ))
    })
})


export const AgentAndBrokerValidation = (agentType) =>  yup.object().shape({
    broker: yup.lazy(obj => yup.object(mapRules(obj, yup.object().shape({
        address: yup.string().required(REQUIRED),
        company: yup.string().required(REQUIRED),
    })))),
    agent: yup.lazy(obj => yup.object(mapRules(obj, yup.object().shape({
        name: yup.string().required(REQUIRED),
        MLSNumber: yup.string().required(REQUIRED),
        email: yup.string().email(VALID_EMAIL).required(REQUIRED),
        emailVerification: yup.string().email(VALID_EMAIL).required(REQUIRED).oneOf([yup.ref('email'), null], "Email Addresses Must Match"), 
        compensationPerMLS: agentType === AGENT_TYPES.SELLERS ? yup.string().required(REQUIRED) : yup.mixed().notRequired(),
        phoneNumber: yup.string().required(REQUIRED).matches(PHONE_REG_EXP, 'This is not a valid phone number.'),
    }))))
});
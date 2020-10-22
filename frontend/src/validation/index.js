import * as yup from "yup";
import { AGENT_TYPES, MORTGAGE_TYPES, PROPERTY_TYPES } from "../shared";

// This is used in lazy validation rules found here: https://github.com/jquense/yup/issues/130#issuecomment-578392176
const mapRules = (map, rule) => Object.keys(map).reduce((newMap, key) => ({...newMap, [key]: rule}), {});

// TODO: Find solution to replace regular expression
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
        mlsNumber: yup.string().test('len', 'Must be exactly 7 digits', val => val.length === 7).required(REQUIRED),
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
        buyerhasSubmittedAdditionalOffer: agentType === AGENT_TYPES.BUYERS || agentType === AGENT_TYPES.BOTH ? yup.string().required(REQUIRED) : yup.string().notRequired(),
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
    firstName: yup.string().required(REQUIRED),
    lastName: yup.string().required(REQUIRED),
    emailAddress: yup.string().required(REQUIRED),
    emailAddressVerification: yup.string().email(VALID_EMAIL).required(REQUIRED).oneOf([yup.ref('emailAddress'), null], "Email Addresses Must Match"),
    firmName: yup.string().notRequired(),
    phoneNumber: yup.string().notRequired().matches(PHONE_REG_EXP, 'This is not a valid phone number.'),
});

export const TestAttorneyValidation = (agentType) => yup.lazy(obj => 
    yup.object(mapRules(obj, yup.object({
        firstName: yup.string().required(REQUIRED),
        lastName: yup.string().required(REQUIRED),
        emailAddress: yup.string().email(VALID_EMAIL).required(REQUIRED),
        emailAddressVerification: yup.string().email(VALID_EMAIL).required(REQUIRED).oneOf([yup.ref('emailAddress'), null], "Email Addresses Must Match"),
        firmName: yup.string().required(REQUIRED),
        phoneNumber: yup.string().required(REQUIRED).matches(PHONE_REG_EXP, 'This is not a valid phone number.'),
    })))
)

export const FSBOValidation = (agentType) => yup.object().shape({
    forSaleByOwner: yup.string().required(REQUIRED),
    sellerFirstName: yup.string().notRequired(),
    sellerLastName: yup.string().notRequired(),
    sellerEmail: yup.string().notRequired(),
    sellerEmailVerification: yup.string().notRequired().oneOf([yup.ref('sellerEmail'), null], "Email Addresses Must Match"),
    attorneyfirstName: yup.string().notRequired(),
    attorneylastName: yup.string().notRequired(),
    attorneyEmail: yup.string().notRequired(),
    attorneyEmailVerification: yup.string().notRequired().oneOf([yup.ref('attorneyEmail'), null], "Email Addresses Must Match"),
    attorneyPhoneNumber: yup.string().notRequired(),
});

export const ListingBrokerValidation = (agentType) => yup.object().shape({
    listingBroker: yup.object().shape({
        company: yup.string().required(REQUIRED),
        address: yup.string().notRequired(),
    }),
    listingAgent: yup.object().shape({
        firstName: yup.string().required(REQUIRED),
        lastName: yup.string().required(REQUIRED),
        email: yup.string().email(VALID_EMAIL).required(REQUIRED),
        emailVerification: yup.string().email(VALID_EMAIL).required(REQUIRED).oneOf([yup.ref('email'), null], "Email Addresses Must Match"),
        phoneNumber: yup.string().required(REQUIRED),
        mlsID: yup.string().required(REQUIRED)
    }),
});

export const LendersValidation = (agentType) => yup.object().shape({
    lender: yup.object().shape({
        firstName: yup.string().required(REQUIRED),
        lastName: yup.string().required(REQUIRED),
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

// switch(typeof(obj)){
//     case 'object':
//         case 'number': return yup.number().notRequired();
//         default: return yup.mixed().notRequired();

export const AgentAndBrokerValidation = (agentType) =>  yup.object().shape({
    broker: yup.lazy(obj => yup.object(mapRules(obj, yup.object().shape({
        address: yup.string().required(REQUIRED),
        companyName: yup.string().required(REQUIRED),
    })))),
    agent: yup.lazy(obj => yup.object(mapRules(obj, yup.object().shape({
        firstName: yup.string().required(REQUIRED),
        MLSNumber: yup.string().required(REQUIRED),
        email: yup.string().email(VALID_EMAIL).required(REQUIRED),
        emailVerification: yup.string().email(VALID_EMAIL).required(REQUIRED).oneOf([yup.ref('email'), null], "Email Addresses Must Match"), 
        compensationPerMLS: agentType === AGENT_TYPES.SELLERS ? yup.string().required(REQUIRED) : yup.mixed().notRequired(),
        phoneNumber: yup.string().required(REQUIRED).matches(PHONE_REG_EXP, 'This is not a valid phone number.'),
    }))))
});
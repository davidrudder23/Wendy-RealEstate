import * as yup from "yup";
import { MORTGAGE_TYPES, PROPERTY_TYPES } from "../shared";

// Regular Express to Verify phone numbers taken from: https://www.sitepoint.com/community/t/phone-number-regular-expression-validation/2204/4
const PHONE_REG_EXP = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const REQUIRED = "Required";
const VALID_EMAIL = "Must be a Valid Email!";

export const BuyerFormOneValidation = yup.object().shape({
    address: yup.string().required(REQUIRED),
    city: yup.string().required(REQUIRED),
    state: yup.string().required(REQUIRED),
    zipCode: yup.number().required().typeError(REQUIRED),
    mlsNumber: yup.string().required().test('len', 'Must be exactly 7 digits', val => val.length === 7),
    deedReference: yup.string().required(REQUIRED).test('len', 'Must be in format XXXX-XXXXXXX', val => val.length === 11),
    firstBuyerFirstName: yup.string().required(REQUIRED),
    firstBuyerLastName: yup.string().required(REQUIRED),
    firstBuyerEmail: yup.string().email(VALID_EMAIL).required(REQUIRED),
    firstBuyerEmailVerification: yup.string().email(VALID_EMAIL).required(REQUIRED).oneOf([yup.ref('firstBuyerEmail'), null], "Email Addresses Must Match"),
    firstBuyerPhoneNumber: yup.string().required(REQUIRED).matches(PHONE_REG_EXP, 'This is not a valid phone number.'),
    firstBuyerFullAddress: yup.string().required(REQUIRED),
    propertyType: yup.string().required(REQUIRED).oneOf([...PROPERTY_TYPES], "Select a valid Property type."),
    concessions: yup.string().required(REQUIRED),
    typeOfMortgage: yup.string().required(REQUIRED).oneOf([...MORTGAGE_TYPES], "Select a valid Mortgage type."),
    purchasePrice: yup.number().required(REQUIRED).typeError("Can only contain digits"),
    firstDeposit: yup.number().typeError("Can only contain numbers"),
    secondDeposit: yup.number().required(REQUIRED).typeError("Can only contain digits"),
    dateHouseBuilt: yup.string().required(REQUIRED),
    titleOrTownSewer: yup.string().required(REQUIRED),
    publicOrTownWater: yup.string().required(REQUIRED),
    inspectionDeadline: yup.string().required(REQUIRED),
    mortgageCommitmentDeadline: yup.string().required(REQUIRED),
    houseClosingDate: yup.string().required(REQUIRED),
    buyerhasSubmittedAdditionalOffer: yup.string().required(REQUIRED),
});

export const BuyerAgentInfoValidation = yup.object().shape({
    buyersAgentFirstName: yup.string().required(REQUIRED),
    buyersAgentMLSNumber: yup.string().required(REQUIRED).test('len', 'Must be exactly 7 digits', val => val.length === 7),
    buyersAgentEmail: yup.string().email(VALID_EMAIL).required(REQUIRED),
    buyersAgentEmailVerification: yup.string().email(VALID_EMAIL).required(REQUIRED).oneOf([yup.ref('buyersAgentEmail'), null], "Email Addresses Must Match"),
    buyersAgentPhoneNumber: yup.string().required(REQUIRED).matches(PHONE_REG_EXP, 'This is not a valid phone number.'),
    buyersAgentBrokerCompany: yup.string().required(REQUIRED),
    buyersAgentBrokerAddress: yup.string().required(REQUIRED),
    buyersAgentCompensationPerMLS: yup.string().notRequired(),
});

export const BuyerAttorneyValidation = yup.object().shape({
    firstName: yup.string().required(REQUIRED),
    lastName: yup.string().required(REQUIRED),
    emailAddress: yup.string().required(REQUIRED),
    emailAddressVerification: yup.string().email(VALID_EMAIL).required(REQUIRED).oneOf([yup.ref('emailAddress'), null], "Email Addresses Must Match"),
    firmName: yup.string().notRequired(),
    phoneNumber: yup.string().notRequired().matches(PHONE_REG_EXP, 'This is not a valid phone number.'),
});

export const FSBOValidation = yup.object().shape({
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

export const ListingBrokerValidation = yup.object().shape({
    listingBroker: yup.object().shape({
        company: yup.string().required(REQUIRED),
        address: yup.string().notRequired(),
    }),
    listingAgent: yup.object().shape({
        firstName: yup.string().required(REQUIRED),
        lastName: yup.string().required(REQUIRED),
        email: yup.string().email(VALID_EMAIL).required(REQUIRED),
        emailVerification: yup.string().email(VALID_EMAIL).required(REQUIRED).oneOf([yup.ref('email'), null], "Email Addresses Must Match"),
        phoneNumber: yup.string().required(REQUIRED)
    }),
});

export const LendersValidation = yup.object().shape({
    lender: yup.object().shape({
        firstName: yup.string().required(REQUIRED),
        lastName: yup.string().required(REQUIRED),
        companyName: yup.string().notRequired(REQUIRED),
        phoneNumber: yup.string().required(REQUIRED).matches(PHONE_REG_EXP, 'This is not a valid phone number.'),
        email: yup.string().email(VALID_EMAIL).required(REQUIRED),
        emailVerification: yup.string().email(VALID_EMAIL).required(REQUIRED).oneOf([yup.ref('email'), null], "Email Addresses Must Match"), 
    }),
});

export const AdditionalInformationValidation = yup.object().shape({

})
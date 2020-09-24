import * as yup from "yup";
import { MORTGAGE_TYPES, PROPERTY_TYPES } from "../shared";

// Regular Express to Verify phone numbers taken from: https://www.sitepoint.com/community/t/phone-number-regular-expression-validation/2204/4
const PHONE_REG_EXP = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const REQUIRED = "Required";

export const BuyerFormOneValidation = yup.object().shape({
    address: yup.string().required(REQUIRED),
    city: yup.string().required(REQUIRED),
    state: yup.string().required(REQUIRED),
    zipCode: yup.number().required().typeError(REQUIRED),
    mlsNumber: yup.number().required().typeError("Can only contain numbers").test('len', 'Must be exactly 7 numbers', val => val.length === 7),
    deedReference: yup.string().required(REQUIRED).test('len', 'Must be in format XXXX-XXXXXXX', val => val.length === 11),
    firstBuyerFirstName: yup.string().required(REQUIRED),
    firstBuyerLastName: yup.string().required(REQUIRED),
    firstBuyerEmail: yup.string().email("Must be a Valid Email!").required(REQUIRED),
    firstBuyerEmailVerification: yup.string().email("Must be a Valid Email!").required(REQUIRED).oneOf([yup.ref('firstBuyerEmail'), null], "Email Addresses Must Match"),
    firstBuyerPhoneNumber: yup.string().required(REQUIRED).matches(PHONE_REG_EXP, 'This is not a valid phone number.'),
    firstBuyerFullAddress: yup.string().required(REQUIRED),
    propertyType: yup.string().required(REQUIRED).oneOf([...PROPERTY_TYPES], "Select a valid Property type."),
    concessions: yup.string().required(REQUIRED),
    typeOfMortgage: yup.string().required(REQUIRED).oneOf([...MORTGAGE_TYPES], "Select a valid Mortgage type."),
    purchasePrice: yup.number().required(REQUIRED).typeError("Can only contain numbers"),
    firstDeposit: yup.number().typeError("Can only contain numbers"),
    secondDeposit: yup.number().required(REQUIRED).typeError("Can only contain numbers"),
    dateHouseBuilt: yup.date().required(REQUIRED).typeError("Date Format Must Follow: YYYY"),
    titleOrTownSewer: yup.string().required(REQUIRED),
    publicOrTownWater: yup.string().required(REQUIRED),
    inspectionDeadline: yup.date().required(REQUIRED).typeError("Date Format Must Follow: MM/DD/YYYY"),
    mortgageCommitmentDeadline: yup.date().required(REQUIRED).typeError("Date Format Must Follow: MM/DD/YYYY"),
    houseClosingDate: yup.date().required(REQUIRED).typeError("Date Format Must Follow: MM/DD/YYYY"),
    buyerhasSubmittedAdditionalOffer: yup.string().required(REQUIRED),
});

// export const BuyerFormTwoValidation = yup.object().shape({

// })
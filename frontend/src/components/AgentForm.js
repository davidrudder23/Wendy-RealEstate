import React from 'react';
import { useForm } from "react-hook-form";
import * as S from "./Form/FormStyled"
import InputField from "./Form/InputField";
import FormHeader from "./Form/FormHeader";
import DropDownList from "./Form/DropDownList"
import MultipleBuyers from './Form/MultipleBuyers';
import Slider from "./Form/Slider";
import PropertyInfo from "./Form/PropertyInfo";
import CustomDatePicker from './Form/DatePicker';
import RadioSelector from "./Form/RadioSelector";

const mortgageTypes = ["Conventional", "FHA", "VA", "Cash"];
const propertyTypes = ["Single Family","Multi Family", "Condo"];

const AgentForm = () => {
    const { register, handleSubmit, watch, errors, control } = useForm();
    const onSubmit = data => console.log(data);

    const [currPropertyType, setCurrentPropertyType] = React.useState("");
    const [currMortgageType, setCurrMortgageType] = React.useState("");
    const [isConcessions, setIsConcessions] = React.useState(false);
    const [additionalOffer, setAdditionalOffer] = React.useState(false);

    console.log("Watch: " + watch("")); // watch input value by passing the name of it

    return (
        // "handleSubmit" will validate your inputs before invoking "onSubmit"
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <PropertyInfo errors={errors} register={register}/>
                <MultipleBuyers errors={errors} register={register} />
                <S.FieldWrapper>
                    <S.FieldTitle>Property Type</S.FieldTitle>
                    <DropDownList
                    placeholder="Property Types"
                    name="propertyType" 
                    label="Select a Property Type" 
                    errors={errors.propertyType} 
                    options={propertyTypes} 
                    register={register}
                    isValue={currPropertyType}
                    setValue={setCurrentPropertyType} />
                </S.FieldWrapper>
                { currPropertyType === "Condo" ?
                <S.FieldWrapper error={errors.condoManagementCompany}>
                    <S.FieldTitle>Who is the Condo Management Company</S.FieldTitle>
                    <div>
                        <InputField 
                        name="condoManagementCompany" 
                        label="Management Company" 
                        errors={errors.condoManagementCompany}
                        register={register}
                        required={true}
                        />
                    </div>
                </S.FieldWrapper>
                : null
                }
                <S.FieldWrapper errors={errors.typeOfMortgage}>
                    <S.FieldTitle>What Type of Mortgage</S.FieldTitle>
                    <DropDownList
                    placeholder="Mortgage Types"
                    name="typeOfMortgage"
                    label="Select a Mortgage Type" 
                    errors={errors.typeOfMortgage} 
                    options={mortgageTypes} 
                    register={register}
                    isValue={currMortgageType}
                    setValue={setCurrMortgageType} />
                </S.FieldWrapper>
                <S.FieldWrapper>
                    <S.FieldTitle>Purchase Price</S.FieldTitle>
                    <div>
                        <InputField 
                        name="purchasePrice" 
                        label="Purchase price?" 
                        errors={errors.purchasePrice}
                        register={register}
                        required={true}
                        />
                    </div>
                </S.FieldWrapper>
                <S.FieldWrapper>
                    <S.FieldTitle>Are there concessions? 
                        <Slider isChecked={isConcessions} setIsChecked={setIsConcessions} name="areConcessions" required={false} register={register} />
                    </S.FieldTitle>
                    { isConcessions ?
                    <div>
                        <InputField 
                        name="concessions" 
                        label="What are the concessions?" 
                        errors={errors.concessions}
                        register={register}
                        required={true}
                        />
                    </div>
                    : null }
                </S.FieldWrapper>
                <S.FieldWrapper>
                    <S.FieldTitle>Deposit Information</S.FieldTitle>
                    <div style={{ display: "flex", flexDirection: "row"}}>
                        <InputField 
                        name="firstDeposit" 
                        label="First Deposit Amount?" 
                        errors={errors.firstDeposit}
                        register={register}
                        required={false}
                        />
                        <InputField 
                        name="secondDeposit" 
                        label="Second Deposit Amount?" 
                        errors={errors.concessions}
                        register={register}
                        required={true}
                        />
                    </div>
                </S.FieldWrapper>
                <S.FieldWrapper>
                        <S.FieldTitle>Date Built</S.FieldTitle>
                        <CustomDatePicker control={control} name="dateHouseBuilt" label="Select Date Built" required={true} />
                </S.FieldWrapper>
                <S.FieldWrapper error={errors.titleOrTownSewer} >
                    <S.FieldTitle>Is there a Title V or Town Sewer</S.FieldTitle>
                    <RadioSelector register={register} name="titleOrTownSewer" required={true} array={["Title V","Public Sewer"]} />
                </S.FieldWrapper>
                <S.FieldWrapper error={errors.publicOrTownWater} >
                    <S.FieldTitle>Public or Town Water</S.FieldTitle>
                    <RadioSelector register={register} name="publicOrTownWater" required={true} array={["Town Water","Private Water"]} />
                </S.FieldWrapper>
                <S.FieldWrapper>
                    <S.FieldTitle>Inspection Deadline</S.FieldTitle>
                    <CustomDatePicker control={control} name="inspectionDeadline" label="Select Inspection Deadline" required={true} />
                </S.FieldWrapper>
                <S.FieldWrapper>
                        <S.FieldTitle>Mortgage Commitment Deadline</S.FieldTitle>
                        <CustomDatePicker control={control} name="mortgageCommitmentDeadline" label="Select Mortgage Commitment Date" required={true} />
                </S.FieldWrapper>
                <S.FieldWrapper>
                    <S.FieldTitle>Closing Date</S.FieldTitle>
                    <CustomDatePicker control={control} name="houseClosingDate" label="Select Closing Date" required={true} />
                </S.FieldWrapper>
                <S.FieldWrapper>
                    <S.FieldTitle>Has The buyer Submitted an offer for another property? 
                    <Slider isChecked={additionalOffer} setIsChecked={setAdditionalOffer} name="buyerHasSubmittedAnotherOffer" register={register} required={false}  />
                    </S.FieldTitle>
                </S.FieldWrapper>

                {/* Need to create multi step form */}
                <br />
                <input type="submit" />
            </form>
        </S.Container>
    );
}

export default AgentForm

// List of fields needed:

// <<Buyers Agent First Name>>
// <<Buyers Agent MLS Number>>
// <<Buyers Agent License Number>>
// <<Buyers Agent Email>>
// <<Buyers Agency Compensation per MLS>>
// <<Attorney First Name>>
// <<Attorney Last Name>>
// <<Attorney Email Address>>
// <<Attorney Firm Name>>
// <<Attorney Phone Number>>
// <<Is this a FSBO (For Sale By Owner)?>>
// <<Sellers First Name>>
// <<Sellers Last Name>>
// <<Sellers Email Address>>
// <<Sellers Attorney name ( This attorney will be holding escrow)>>
// <<Sellers Attorney Phone Number>>
// <<Sellers Attorney Email >>
// <<Listing Broker Company>>
// <<Listing Broker Address>>
// <<List agent First Name>>
// <<Listing Agent Phone Number>>
// <<Listing Agent Email>>
// <<Lenders Name (First name only)>>
// <<Lenders Name (Last name only)>>
// <<Lender Company Name>>
// <<Lenders Phone Number>>
// <<Lenders Email>>
// <<Transaction Coordinator>>
// <<Transaction Coordinator Email Address>>
// <<Team lead or Sphere Not split with eXp only with the Tracy Gagne Team>>
// <<Notes (is there anything else I should know)>>
// <<Documents for File>>
// <<Is there a Referral to be paid on this transaction?>>
// <<Name of Client>>
// <<Agent that Referred this client>>
// <<Broker of Agent that Referred this client>>
// <<Referring agent email address>>
// <<Referral amount>>
// <<Confirmed Inspection Date>>
// <<Confirmed Inspection Time>>
// <<Confirmed Closing Date>>
// <<Confirmed Closing Time>>
// <<Buyers Agent Phone>>
// <<List agent Last Name>>
// <<Buyers Agent Broker Company>>
// <<Buyers Agent Broker Address>>
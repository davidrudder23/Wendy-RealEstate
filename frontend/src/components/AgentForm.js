import React from 'react'
import { useForm } from "react-hook-form";
import * as S from "./Form/FormStyled"
import InputField from "./Form/InputField";
import FormHeader from "./Form/FormHeader";
import DropDownList from "./Form/DropDownList"
import MultipleBuyers from './Form/MultipleBuyers';
import Slider from "./Form/Slider";

const mortgageTypes = ["Conventional", "FHA", "VA", "Cash"];
const propertyTypes = ["Single Family","Multi Family", "Condo"];

const AgentForm = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    const [currPropertyType, setCurrentPropertyType] = React.useState("");
    const [isConcessions, setIsConcessions] = React.useState(false);

    console.log("Watch: " + watch("typeOfMortgage")); // watch input value by passing the name of it

    const propertyInformation =
    errors.propertyAddress &&
    errors.mlsNumber &&
    errors.deedReference;


    return (
        // "handleSubmit" will validate your inputs before invoking "onSubmit"
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <S.FieldWrapper error={propertyInformation}>
                    <S.FieldTitle>Property Information</S.FieldTitle>
                    <div>
                        <InputField 
                        name="propertyAddress" 
                        label="Property Address" 
                        errors={errors.propertyAddress} 
                        register={register} 
                        required={true}/>
                    </div>
                    <div>
                        <InputField 
                        name="mlsNumber" 
                        label="MLS Number" 
                        errors={errors.mlsNumber} 
                        register={register} 
                        required={true}/>
                    </div>
                    <div>
                        <InputField 
                        name="deedReference" 
                        label="Deed Reference (Book)" 
                        errors={errors.deedReference} 
                        register={register} 
                        required={true}/>
                    </div>
                </S.FieldWrapper>
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
                    isValue={currPropertyType}
                    setValue={setCurrentPropertyType} />
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
                    <S.FieldTitle>Are there concessions? <Slider isChecked={isConcessions} setIsChecked={setIsConcessions} /></S.FieldTitle>
                    {/* TODO: Make a text area field instead for this section. Concessions can be lengthy */}
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
                


                <br />
                <input type="submit" />
            </form>
        </S.Container>
    );
}

export default AgentForm

// List of fields needed:
// <<1st Deposit Amount>>
// <<2nd Deposit Amount>>
// <<Year Built>>
// <<Is there a Title V or Town Sewer?>>
// <<Public or Town Water>>
// <<Inspection Deadline>>
// <<Mortgage Commitment Deadline>>
// <<Closing Date>>
// <<Has buyer submitted an offer for another property?>>
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
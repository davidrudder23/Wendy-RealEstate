import React from 'react';
import { useForm } from "react-hook-form";
import * as S from "../FormFields/FormStyled";
import InputField from "../FormFields/InputField";
import FormHeader from "../FormFields/FormHeader";
import DropDownList from "../FormFields/DropDownList";
import MultipleBuyers from '../FormFields/MultipleBuyers';
import Slider from "../FormFields/Slider";
import PropertyInfo from "../FormFields/PropertyInfo";
import CustomDatePicker from '../FormFields/DatePicker';
import RadioSelector from "../FormFields/RadioSelector";
import { useStateMachine } from 'little-state-machine';
import updateAction from '../../state/updateState';
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers";
import { BuyerFormOneValidation } from "../../validation";
import { MORTGAGE_TYPES, PROPERTY_TYPES } from "../../shared";

const Property = () => {
    const { state, action } = useStateMachine(updateAction);
    const { push } = useHistory();
    const { register, handleSubmit, errors, control, getValues } = useForm({
        defaultValues: state.details.general,
        resolver: yupResolver(BuyerFormOneValidation),
        mode: 'onSubmit',
        reValidateMode: "onChange"
    });

    const onSubmit = data => {
        action({ general: data});
        push("/BuyerAgent");
    }

    const [currPropertyType, setCurrentPropertyType] = React.useState("");
    const [currMortgageType, setCurrMortgageType] = React.useState("");
    const [isConcessions, setIsConcessions] = React.useState(false);
    const [additionalOffer, setAdditionalOffer] = React.useState(false);
    const [inspectionWaved, setInspectionWaved] = React.useState(false);

    return (
        // "handleSubmit" will validate your inputs before invoking "onSubmit"
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <PropertyInfo getValues={getValues} errors={errors} register={register}/>
                <MultipleBuyers getValues={getValues} errors={errors} register={register} />
                <S.FieldWrapper errors={errors.propertyType}>
                        <S.FieldTitle>Property Type</S.FieldTitle>
                        <DropDownList
                        placeholder="Property Types"
                        name="propertyType" 
                        label="Select a Property Type" 
                        errors={errors.propertyType} 
                        options={PROPERTY_TYPES} 
                        register={register}
                        isValue={currPropertyType}
                        setValue={setCurrentPropertyType} />
                </S.FieldWrapper>
                { currPropertyType === "Condo" ?
                <S.FieldWrapper error={errors.condoManagementCompany}>
                    <S.FieldTitle>Who is the Condo Management Company</S.FieldTitle>
                    <div>
                        <InputField
                        getValues={getValues}
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
                        options={MORTGAGE_TYPES}
                        register={register}
                        isValue={currMortgageType}
                        setValue={setCurrMortgageType}
                        />
                </S.FieldWrapper>
                <S.FieldWrapper errors={errors.purchasePrice}>
                    <S.FieldTitle>Purchase Price</S.FieldTitle>
                    <div>
                        <InputField
                        getValues={getValues}
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
                        <Slider 
                        isChecked={isConcessions}
                        setIsChecked={setIsConcessions}
                        name="areConcessions"
                        required={false}
                        register={register}
                        />
                    </S.FieldTitle>
                    { isConcessions ?
                    <div>
                        <InputField
                        getValues={getValues}
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
                    <S.MultiContainer>
                        <InputField
                        getValues={getValues}
                        name="firstDeposit" 
                        label="First Deposit Amount?" 
                        errors={errors.firstDeposit}
                        register={register}
                        required={false}
                        />
                        <InputField
                        getValues={getValues}
                        name="secondDeposit" 
                        label="Second Deposit Amount?" 
                        errors={errors.secondDeposit}
                        register={register}
                        required={true}
                        />
                    </S.MultiContainer>
                </S.FieldWrapper>
                <S.FieldWrapper>
                        <S.FieldTitle>Year Built</S.FieldTitle>
                        <CustomDatePicker
                        getValues={getValues}
                        showYearPicker={true} 
                        control={control} 
                        name="dateHouseBuilt" 
                        label="Select Date Built" 
                        required={true}
                        dateFormat="yyyy"
                        />
                </S.FieldWrapper>
                <S.FieldWrapper error={errors.titleOrTownSewer} >
                        <S.FieldTitle>Is there a Title V or Town Sewer</S.FieldTitle>
                        <RadioSelector 
                        register={register} 
                        name="titleOrTownSewer" 
                        required={false} 
                        array={["Title V","Public Sewer"]}
                        />
                </S.FieldWrapper>
                <S.FieldWrapper error={errors.publicOrTownWater} >
                        <S.FieldTitle>Public or Town Water</S.FieldTitle>
                        <RadioSelector
                        register={register}
                        name="publicOrTownWater" 
                        required={false}
                        array={["Town Water","Private Water"]}
                        />
                </S.FieldWrapper>
                <S.FieldWrapper>
                        <S.FieldTitle>Inspection Waved
                            <Slider 
                            isChecked={inspectionWaved}
                            setIsChecked={setInspectionWaved}
                            name="isInspectionWaved" 
                            register={register}
                            required={false}
                            />
                        </S.FieldTitle>
                            { inspectionWaved ? null :
                            <CustomDatePicker
                            getValues={getValues}
                            control={control} 
                            name="inspectionDeadline" 
                            label="Select Inspection Deadline" 
                            required={true}
                            />}
                </S.FieldWrapper>
                { getValues(`typeOfMortgage`) !== 'Cash' ?
                <S.FieldWrapper>
                    <S.FieldTitle>Mortgage Commitment Deadline</S.FieldTitle>
                    <CustomDatePicker 
                    control={control}
                    getValues={getValues}
                    name="mortgageCommitmentDeadline" 
                    label="Select Mortgage Commitment Date" 
                    required={true}
                    />
                </S.FieldWrapper>
                : null }
                <S.FieldWrapper>
                        <S.FieldTitle>Closing Date</S.FieldTitle>
                        <CustomDatePicker 
                        control={control}
                        getValues={getValues}
                        name="houseClosingDate" 
                        label="Select Closing Date" 
                        required={true}
                        />
                </S.FieldWrapper>
                <S.FieldWrapper>
                    <S.FieldTitle>Has The buyer Submitted an offer for another property? 
                        <Slider 
                        isChecked={additionalOffer}
                        setIsChecked={setAdditionalOffer}
                        name="buyerHasSubmittedAdditionalOffer" 
                        register={register}
                        required={false}
                        />
                    </S.FieldTitle>
                </S.FieldWrapper>
                <S.Input type="submit" value="Next" />
            </form>
        </S.Container>
    );
}

export default Property
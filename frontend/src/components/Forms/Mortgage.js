import React from 'react'
import { useStateMachine } from 'little-state-machine';
import updateAction from '../../state/updateState';
import { useHistory } from "react-router-dom";
// TODO: Enable Validation
// import { yupResolver } from "@hookform/resolvers";
// import { BuyerFormOneValidation } from "../../validation";
import { useForm } from "react-hook-form";
import * as S from "../FormFields/FormStyled";
import DropDownList from "../FormFields/DropDownList";
import { MORTGAGE_TYPES } from "../../shared";
import CustomDatePicker from '../FormFields/DatePicker';
import InputField from "../FormFields/InputField";
import Slider from "../FormFields/Slider";
import FormHeader from '../FormFields/FormHeader';
import { AGENT_TYPES } from "../../shared";
import { Next, Back } from "../FormFields/SharedButtons";

const Mortgage = () => {
    const { state, action } = useStateMachine(updateAction);
    const agentType = state.details.agentType;
    const { push } = useHistory();
    const { register, handleSubmit, errors, control, getValues } = useForm({
        defaultValues: state.details.mortgage,
        // resolver: yupResolver(BuyerFormOneValidation),
        mode: 'onSubmit',
        reValidateMode: "onChange"
    });

    const onSubmit = data => {
        action({ mortgage: data});
        if(process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT !== "false"){
            push("/result");
        }else {
            if(agentType === AGENT_TYPES.SELLERS){
                
                console.log("I am currently skipping sellers page because it is not complete. ")
                // TODO: Fix this when sellers page is done
                // push("/Sellers");
                push("/ListingBroker");
            }
            if(agentType === AGENT_TYPES.BUYERS){
                if(state.details.property.buyerHasSubmittedAdditionalOffer){
                    push("/BuyersAttorney");
                }else{
                    push("/BuyersAgent");
                }
            }
        }
    }

    const [currMortgageType, setCurrMortgageType] = React.useState("");
    const [isConcessions, setIsConcessions] = React.useState(false);

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormHeader />
            <S.FieldWrapper errors={errors.typeOfMortgage}>
                        <S.FieldTitle>What Type of Mortgage</S.FieldTitle>
                        <DropDownList
                        placeholder="Mortgage Types"
                        name="typeOfMortgage"
                        label="Select a Mortgage Type" 
                        errors={errors.typeOfMortgage}
                        options={Object.values(MORTGAGE_TYPES)}
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
                <Next />
                <Back />
            </form>
        </S.Container>
    )
}

export default Mortgage

import React from 'react'
import FormHeader from "../FormFields/FormHeader";
import * as S from "../FormFields/FormStyled";
import InputField from "../FormFields/InputField";
import { ListingBrokerValidation } from "../../validation";
import { AGENT_TYPES, MORTGAGE_TYPES } from "../../shared";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from "../../hooks/useCustomFormHook";

// In my notes ListingBroker === ListingBroker and ListingAgent pages
const ListingBroker = () => {
    const { register, handleSubmit, errors, action, push, getValues, agentType, state } = useCustomFormHook(ListingBrokerValidation);

    const onSubmit = data => {
        action(data);
        if(process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT !== "false"){
            push("/result");
        }else {
            if(agentType === AGENT_TYPES.SELLERS){
                push("/Attorney/Seller");
            }
            if(agentType === AGENT_TYPES.BUYERS){
                if(state.details.mortgage.typeOfMortgage === MORTGAGE_TYPES.CASH){
                    push("/AdditionalInformation");
                }else {
                    push("/Lenders");
                }
            }
        }
    }

    // This was done because the field will be wrapped different html elements depending on agentType
    const phoneNumberField = () => {
        return (
            <InputField 
            getValues={getValues}
            name="listingAgent.phoneNumber"
            label="Phone Number"
            errors={errors.listingAgent?.phoneNumber}
            register={register}
            required={true}
            />
        )
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <S.FieldWrapper>
                    <S.FieldTitle>Listing Broker</S.FieldTitle>
                    <S.MultiContainer>
                    {/* Sellers Side this should default to eXp and not be displayed */}
                    {/* TODO: give option to pick eXp */}
                        <InputField
                        getValues={getValues}
                        name="listingBroker.company"
                        label="Company"
                        errors={errors.listingBroker?.company}
                        register={register}
                        required={true}
                        />
                        {/* TODO: Can be pre filled if eXp with --> eXp Address = P.O. Box 10665 Holyoke Ma 01041*/}
                        <InputField                        
                        required={true}
                        getValues={getValues}
                        name="listingBroker.address"
                        label="Address"
                        errors={errors.listingBroker?.address}
                        register={register}
                        />
                    </S.MultiContainer>
                </S.FieldWrapper>
                <S.FieldWrapper>
                    <S.FieldTitle>Listing Agent</S.FieldTitle>
                    <S.MultiContainer>
                        <InputField 
                        required={true}
                        getValues={getValues}
                        name="listingAgent.firstName"
                        label="First Name"
                        errors={errors.listingAgent?.firstName}
                        register={register}
                        />
                        <InputField 
                        required={true}
                        getValues={getValues}
                        name="listingAgent.lastName"
                        label="Last Name"
                        errors={errors.listingAgent?.lastName}
                        register={register}
                        />
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <InputField 
                        required={true}
                        getValues={getValues}
                        name="listingAgent.email"
                        label="Email"
                        errors={errors.listingAgent?.email}
                        register={register}
                        />
                        <InputField 
                        required={true}
                        getValues={getValues}
                        name="listingAgent.emailVerification"
                        label="Email Verification"
                        errors={errors.listingAgent?.emailVerification}
                        register={register}
                        />
                    </S.MultiContainer>
                    { state.details.agentType === AGENT_TYPES.SELLERS || state.details.agentType === AGENT_TYPES.BOTH ? 
                        <S.MultiContainer>
                            {phoneNumberField()}
                            <InputField 
                                required={true}
                                getValues={getValues}
                                name="listingAgent.mlsID"
                                label="MLS ID"
                                errors={errors.listingAgent?.mlsID}
                                register={register}   
                            />
                        </S.MultiContainer>
                    : 
                    <div>
                        {phoneNumberField()}
                    </div>
                    }
                </S.FieldWrapper>
                <Next />
                <Back />
            </form> 
        </S.Container>
    )
}

export default ListingBroker

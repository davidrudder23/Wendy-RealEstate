import React from 'react'
import FormHeader from "../FormFields/FormHeader";
import * as S from "../FormFields/FormStyled";
import InputField from "../FormFields/InputField";
import { ListingBrokerValidation } from "../../validation";
import { AGENT_TYPES, MORTGAGE_TYPES } from "../../shared";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from "../../hooks/useCustomFormHook";
import { handleDeploymentPath } from "../../shared";
import Broker from "./Broker";

const ListingBroker = () => {
    const { register, handleSubmit, errors, action, push, getValues, agentType, state } = useCustomFormHook(ListingBrokerValidation);
    
    const onSubmit = data => {
        action(data);
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false") {
            push(handleDeploymentPath("/result"));
        } else {
            if (agentType === AGENT_TYPES.SELLERS) {
                push(handleDeploymentPath("/Attorney/Seller"));
            }
            if (agentType === AGENT_TYPES.BUYERS) {
                if (state.details.mortgage.typeOfMortgage === MORTGAGE_TYPES.CASH) {
                    push(handleDeploymentPath("/AdditionalInformation"));
                } else {
                    push(handleDeploymentPath("/Lenders"));
                }
            }
        }
    }

    let firstNameError = errors?.listing?.agent?.firstName;
    let lastNameError = errors?.listing?.agent?.lastName;
    let emailError = errors?.listing?.agent?.email;
    let emailVerificationError = errors?.listing?.agent?.emailVerification;
    let mlsIDError = errors?.listing?.agent?.mlsID;
    let phoneNumberError = errors?.listing?.agent?.phoneNumber;
    let generalError = firstNameError || lastNameError || emailError || emailVerificationError || mlsIDError || phoneNumberError;

    const phoneNumberField = () => {
        return (
            <InputField
                getValues={getValues}
                name="listing.agent.phoneNumber"
                label="Phone Number"
                errors={phoneNumberError}
                register={register}
                required={true}
            />
        )
    }
    
    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <Broker
                    title={"Listing"}
                    represents={AGENT_TYPES.SELLERS}
                    getValues={getValues}
                    register={register}
                    errors={errors}
                />
                <S.FieldWrapper error={generalError}>
                    <S.FieldTitle>Listing Agent</S.FieldTitle>
                    <S.MultiContainer>
                        <InputField
                            required={true}
                            getValues={getValues}
                            name="listing.agent.firstName"
                            label="First Name"
                            errors={firstNameError}
                            register={register}
                        />
                        <InputField
                            required={true}
                            getValues={getValues}
                            name="listing.agent.lastName"
                            label="Last Name"
                            errors={lastNameError}
                            register={register}
                        />
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <InputField
                            required={true}
                            getValues={getValues}
                            name="listing.agent.email"
                            label="Email"
                            errors={emailError}
                            register={register}
                        />
                        <InputField
                            required={true}
                            getValues={getValues}
                            name="listing.agent.emailVerification"
                            label="Email Verification"
                            errors={emailVerificationError}
                            register={register}
                        />
                    </S.MultiContainer>
                    {agentType === AGENT_TYPES.SELLERS || state.details.agentType === AGENT_TYPES.BOTH ?
                        <S.MultiContainer>
                            {phoneNumberField()}
                            <InputField
                                required={true}
                                getValues={getValues}
                                name="listing.agent.mlsID"
                                label="MLS ID"
                                errors={mlsIDError}
                                register={register}
                            />
                        </S.MultiContainer>
                        :
                        <div>
                            {phoneNumberField()}
                        </div>
                    }
                </S.FieldWrapper>
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default ListingBroker

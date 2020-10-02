import React from 'react'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import InputField from "../FormFields/InputField";
import { useStateMachine } from 'little-state-machine';
import updateAction from '../../state/updateState';
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
// TODO: Enable Validation
// import { BuyerAgentInfoValidation } from "../../validation";
// import { yupResolver } from '@hookform/resolvers';
import { AGENT_TYPES } from "../../shared";
import { Next, Back } from "../FormFields/SharedButtons";

// This field represents Buyers Attorney In both notebook flows
const Attorney = () => {
    const { state, action } = useStateMachine(updateAction);
    const agentType = state.details.agentType;
    const { push } = useHistory();
    const { register, handleSubmit, errors, getValues } = useForm({
        defaultValues: state.details.buyerAttorney,
        mode: 'onChange',
        reValidateMode: 'onChange',
        // resolver: yupResolver(BuyerAgentInfoValidation),
    });

    const onSubmit = data => {
        action({ buyerAttorney: data});
        if(process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT !== "false"){
            push("/result");
        }else {
            if(agentType === AGENT_TYPES.SELLERS){
                push("/AdditionalInformation");
            }
            if(agentType === AGENT_TYPES.BUYERS){
                push("/FSBO");
            }
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)} >
                <FormHeader />
                <S.FieldWrapper>
                <S.FieldTitle>Buyers Attorney Information</S.FieldTitle>
                   <S.MultiContainer>
                                <InputField
                                getValues={getValues}
                                name="firstName"
                                label="First Name"
                                errors={errors.firstName}
                                required={true}
                                register={register}
                                />
                                <InputField 
                                getValues={getValues}
                                name="lastName"
                                label="Last Name"
                                errors={errors.lastName}
                                required={true}
                                register={register}
                                />
                    </S.MultiContainer>
                    <S.MultiContainer>
                                <InputField
                                getValues={getValues}
                                name="emailAddress"
                                label="Email"
                                errors={errors.emailAddress}
                                required={true}
                                register={register}
                                />
                                <InputField 
                                getValues={getValues}
                                name="emailAddressVerification"
                                label="Email Verification"
                                errors={errors.emailAddressVerification}
                                required={true}
                                register={register}
                                />
                    </S.MultiContainer>
                    <S.MultiContainer>
                                <InputField
                                getValues={getValues}
                                name="firmName"
                                label="Attorney Firm Name"
                                errors={errors.firmName}
                                required={false}
                                register={register}
                                />
                                <InputField 
                                getValues={getValues}
                                name="phoneNumber"
                                label="Phone number"
                                errors={errors.phoneNumber}
                                required={false}
                                register={register}
                                />
                    </S.MultiContainer>
                </S.FieldWrapper>
                <Next />
                <Back />
            </form>
        </S.Container>
    )
}

export default Attorney

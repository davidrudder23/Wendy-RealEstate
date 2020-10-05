import React from 'react'
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import InputField from "../FormFields/InputField";
import { useStateMachine } from 'little-state-machine';
import updateAction from '../../state/updateState';
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { TestAttorneyValidation } from "../../validation";
import { yupResolver } from '@hookform/resolvers';
import { AGENT_TYPES } from "../../shared";
import { Next, Back } from "../FormFields/SharedButtons";

// This field represents Buyers Attorney In both notebook flows
const Attorney = () => {
    const { state, action } = useStateMachine(updateAction);
    const agentType = state.details.agentType;
    const { push } = useHistory();
    const { represents } = useParams();
    const { register, handleSubmit, errors, getValues } = useForm({
        defaultValues: state,
        mode: 'onChange',
        reValidateMode: 'onChange',
        // resolver: yupResolver(TestAttorneyValidation),
    });

    console.log(errors)
    console.log(errors[represents]?.firstName.message)
    const onSubmit = data => {
        action({ attorney: data });
        push("/result")
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
                <S.FieldTitle>{represents} Attorney Information</S.FieldTitle>
                   <S.MultiContainer>
                                <InputField
                                getValues={getValues}
                                name={`${represents}.firstName`}
                                label="First Name"
                                errors={errors[represents]?.firstName}
                                required={true}
                                register={register}
                                />
                                <InputField 
                                getValues={getValues}
                                name={`${represents}.lastName`}
                                label="Last Name"
                                errors={errors[represents]?.lastName}
                                required={true}
                                register={register}
                                />
                    </S.MultiContainer>
                    <S.MultiContainer>
                                <InputField
                                getValues={getValues}
                                name={`${represents}.emailAddress`}
                                label="Email"
                                errors={errors[represents]?.emailAddress}
                                required={true}
                                register={register}
                                />
                                <InputField 
                                getValues={getValues}
                                name={`${represents}.emailAddressVerification`}
                                label="Email Verification"
                                errors={errors[represents]?.emailAddressVerification}
                                required={true}
                                register={register}
                                />
                    </S.MultiContainer>
                    <S.MultiContainer>
                                <InputField
                                getValues={getValues}
                                name={`${represents}.firmName`}
                                label="Attorney Firm Name"
                                errors={errors[represents]?.firmName}
                                required={false}
                                register={register}
                                />
                                <InputField 
                                getValues={getValues}
                                name={`${represents}.phoneNumber`}
                                label="Phone number"
                                errors={errors[represents]?.phoneNumber}
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

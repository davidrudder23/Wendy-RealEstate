import React from 'react'
import FormHeader from "../FormFields/FormHeader";
import * as S from "../FormFields/FormStyled";
import InputField from "../FormFields/InputField";
import { LendersValidation } from "../../validation";
import { AGENT_TYPES } from "../../shared";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from "../../hooks/useCustomFormHook";

// TODO: Verify if lenders can only be accessed buy a Buyers Agent
const Lenders = () => {
    const { register, handleSubmit, errors, action, push, getValues, agentType } = useCustomFormHook(LendersValidation);

    const onSubmit = data => {
        action(data);
        if(process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT !== "false"){
            push("/result");
        }else {
            if(agentType === AGENT_TYPES.BUYERS){
                push("/AdditionalInformation");
            }
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormHeader />
                <S.FieldWrapper>
                    <S.FieldTitle>Lender Information</S.FieldTitle>
                    <S.MultiContainer>
                        <InputField 
                        getValues={getValues}
                        name="lender.firstName"
                        label="First Name"
                        errors={errors.lender?.firstName}
                        register={register}
                        />
                        <InputField 
                        getValues={getValues}
                        name="lender.lastName"
                        label="Last Name"
                        errors={errors.lender?.lastName}
                        register={register}
                        />
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <InputField 
                        getValues={getValues}
                        name="lender.companyName"
                        label="Company Name"
                        errors={errors.lender?.company}
                        register={register}
                        />
                        <InputField 
                        getValues={getValues}
                        name="lender.phoneNumber"
                        label="Phone Number"
                        errors={errors.lender?.phoneNumber}
                        register={register}
                        />
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <InputField 
                        getValues={getValues}
                        name="lender.email"
                        label="Email"
                        errors={errors.lender?.email}
                        register={register}
                        />                        
                        <InputField 
                        getValues={getValues}
                        name="lender.emailVerification"
                        label="Email Verification"
                        errors={errors.lender?.emailVerification}
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

export default Lenders

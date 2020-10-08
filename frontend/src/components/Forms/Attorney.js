import React from 'react'
import { useParams } from "react-router-dom";
import InputField from "../FormFields/InputField";
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { TestAttorneyValidation } from "../../validation";
import { AGENT_TYPES } from "../../shared";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from "../../hooks/useCustomFormHook";

/* This field represents Buyers Attorney In both notebook flows */
const Attorney = () => {
    const { register, handleSubmit, errors, action, push, getValues, agentType } = useCustomFormHook(TestAttorneyValidation);
    const { represents } = useParams();
    const onSubmit = data => {
        action({ attorney: data });
        if(process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false"){
            push("/result");
        }else if(agentType === AGENT_TYPES.SELLERS){

                if(represents === AGENT_TYPES.SELLERS){
                    push(`/Client/${AGENT_TYPES.BUYERS}`);
                
                }else if(represents === AGENT_TYPES.BUYERS){
                    push("/AdditionalInformation");
                    
                }

        }else if(agentType === AGENT_TYPES.BUYERS){
            push("/FSBO");
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)} >
                <FormHeader />
                <S.FieldWrapper>
                <S.FieldTitle>{represents}'s Attorney Information</S.FieldTitle>
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

import React from 'react'
import InputField from "../FormFields/InputField";
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { Next, Back } from "../FormFields/SharedButtons";
import { AgentAndBrokerValidation } from "../../validation";
import useCustomFormHook from "../../hooks/useCustomFormHook";
import { AGENT_TYPES } from "../../shared";
import { useParams } from 'react-router-dom';

const Agent = () => {
    const { register, handleSubmit, errors, action, push, getValues, agentType } = useCustomFormHook(AgentAndBrokerValidation);
    const { represents } = useParams();
    const onSubmit = data => {
        action(data);
        if(process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false"){
            push("/result");
        }else{
            push(`/Attorney/${AGENT_TYPES.BUYERS}`);
        }
    }

    const loadAgentPhoneNumber = () => {
        return (
            <InputField
            getValues={getValues}
            name={`agent.${represents}.phoneNumber`}
            label="Phone Number"
            errors={errors?.agent?.[represents]?.phoneNumber}
            register={register}
            required={true}
            />
        )
    }


    const loadFieldsBasedOnAgent = () => {
        if(AGENT_TYPES.BUYERS === agentType){
            return (
                <div>
                   {loadAgentPhoneNumber()}
                </div>
            )
        }else if(AGENT_TYPES.SELLERS === agentType){
            return (
                <S.MultiContainer>
                    {loadAgentPhoneNumber()}
                    <InputField
                    getValues={getValues}
                    name={`agent.${represents}.compensationPerMLS`}
                    label="Agency Compensation per MLS"
                    errors={errors?.agent?.[represents]?.compensationPerMLS}
                    register={register}
                    required={true}
                    />
                </S.MultiContainer>
            )
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <S.FieldWrapper >
                   <S.FieldTitle>{represents}'s Agent</S.FieldTitle>
                   <S.MultiContainer>
                        <InputField
                        getValues={getValues}
                        name={`agent.${represents}.firstName`}
                        label="First Name"
                        errors={errors?.agent?.[represents]?.firstName}
                        required={true}
                        register={register}
                        />
                        <InputField
                        getValues={getValues}
                        name={`agent.${represents}.MLSNumber`}
                        label="Agent MLS Number"
                        errors={errors?.agent?.[represents]?.MLSNumber}
                        required={true}
                        register={register}
                        />
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <InputField
                        getValues={getValues}
                        name={`agent.${represents}.email`}
                        label="Email Address"
                        erros={errors?.agent?.[represents]?.email}
                        register={register}
                        required={true}
                        />
                        <InputField
                        getValues={getValues}
                        name={`agent.${represents}.emailVerification`}
                        label="Email Address Verification"
                        errors={errors?.agent?.[represents]?.emailVerification}
                        register={register}
                        required={true}
                        />
                    </S.MultiContainer>
                    {loadFieldsBasedOnAgent()}
                </S.FieldWrapper>
                <S.FieldWrapper>
                    <S.FieldTitle>{represents}'s Broker</S.FieldTitle>
                    <S.MultiContainer>
                        <InputField
                        getValues={getValues}
                        name={`broker.${represents}.companyName`}
                        label="Broker Company"
                        errors={errors?.broker?.[represents]?.companyName}
                        register={register}
                        required={true}
                        />
                        <InputField
                        getValues={getValues}
                        name={`broker.${represents}.address`}
                        label="Broker Address"
                        errors={errors?.broker?.[represents]?.address}
                        register={register}
                        required={true}
                        />
                    </S.MultiContainer>
                </S.FieldWrapper>
                <Next />
                <Back />
            </form>
        </S.Container>
    )
}

export default Agent

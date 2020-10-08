import React from 'react'
import * as S from "../FormFields/FormStyled";
import FormHeader from '../FormFields/FormHeader';
import { AGENT_TYPES } from "../../shared";
import RadioSelector from "../FormFields/RadioSelector";
import { Next } from "../FormFields/SharedButtons";
import { AgentTypeValidation } from "../../validation";
import useCustomFormHook from "../../hooks/useCustomFormHook";
import { handleDeploymentPath } from "../../shared";

const AgentType = () => {
    const { register, handleSubmit, errors, action, push } = useCustomFormHook(AgentTypeValidation);
    const onSubmit = data => {
        action(data);
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false") {
            push(handleDeploymentPath("result"));
        } else {
            push(handleDeploymentPath("/Property"));
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <S.FieldWrapper error={errors.agentType}>
                    <S.FieldTitle>Please Select who you will be representing.</S.FieldTitle>
                    <RadioSelector
                        register={register}
                        name="agentType"
                        array={Object.values(AGENT_TYPES)}
                    />
                </S.FieldWrapper>
                <Next />
            </form>
        </S.Container>
    )
}

export default AgentType

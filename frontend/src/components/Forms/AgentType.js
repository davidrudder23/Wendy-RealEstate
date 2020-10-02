import React from 'react'
import { useForm } from "react-hook-form";
import * as S from "../FormFields/FormStyled";
import { useHistory } from "react-router-dom";
import FormHeader from '../FormFields/FormHeader';
import {AGENT_TYPES} from "../../shared";
import { useStateMachine } from 'little-state-machine';
import updateAction from '../../state/updateState';
import RadioSelector from "../FormFields/RadioSelector";
// TODO: Enable Validation
// import { yupResolver } from "@hookform/resolvers";
// import { AgentTypeValidation } from "../../validation";

const AgentType = () => {
    const { state, action } = useStateMachine(updateAction);
    const { push } = useHistory();
    const { register, handleSubmit, errors } = useForm({
        defaultValues: state.details,
        mode: 'onSubmit',
        reValidateMode: "onChange",
        // resolver: yupResolver(AgentTypeValidation),
    });

    const onSubmit = data => {
        action(data);
        if(process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT !== "false"){
            push("result")
        }else{
            push("/Property");
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
                        required={true}
                        array={Object.values(AGENT_TYPES)}
                    />
                </S.FieldWrapper>
                <S.Input type="submit" value="next" />
            </form>
        </S.Container>
    )
}

export default AgentType

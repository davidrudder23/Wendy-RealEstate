import React from 'react'
import Broker from "./Broker";
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { Next, Back } from "../FormFields/SharedButtons";
import { AgentAndBrokerValidation } from "../../validation";
import useCustomFormHook from "../../hooks/useCustomFormHook";
import { AGENT_TYPES } from "../../shared";
import { useParams } from 'react-router-dom';
import { handleDeploymentPath } from "../../shared";
import Agents from '../FormFields/Agents';
import { agentDefaultValues } from "../../defaultValues";

const Agent = () => {
    const { represents } = useParams();
    const { register, handleSubmit, errors, action, push, getValues, agentType, state } = useCustomFormHook(AgentAndBrokerValidation, agentDefaultValues(represents));

    const onSubmit = data => {
        action({
            client: {
                ...state?.details?.client,
                [represents]: {
                    ...state?.details?.client?.[represents],
                    agent: {
                        ...data?.agent?.[represents],
                    },
                    broker: {
                        ...data?.broker?.[represents],
                    }
                }
            },
        });
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false") {
            push(handleDeploymentPath("/result"));
        } else {
            push(handleDeploymentPath(`/Attorney/${AGENT_TYPES.BUYERS}`));
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader pageHeader={`${represents}'s Broker and Agent`} />
                <Broker
                    title={`${represents}'s`}
                    getValues={getValues}
                    errors={errors}
                    register={register}
                    represents={represents}
                />
                <Agents
                    title={`${represents}'s`}
                    represents={represents}
                    agentType={agentType}
                    register={register}
                    errors={errors}
                    getValues={getValues}
                />
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default Agent

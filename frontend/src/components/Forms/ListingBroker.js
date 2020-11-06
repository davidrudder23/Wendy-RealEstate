import React from 'react'
import FormHeader from "../FormFields/FormHeader";
import * as S from "../FormFields/FormStyled";
import { ListingBrokerValidation } from "../../validation";
import { AGENT_TYPES, MORTGAGE_TYPES } from "../../shared";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from "../../hooks/useCustomFormHook";
import { handleDeploymentPath } from "../../shared";
import Broker from "./Broker";
import Agents from "../FormFields/Agents";
import { ListingBrokerDefaultValues } from "../../defaultValues";

const ListingBroker = () => {
    const { register, handleSubmit, errors, action, push, getValues, agentType, state } = useCustomFormHook(ListingBrokerValidation, ListingBrokerDefaultValues);
    const onSubmit = data => {
        action({
            client: {
                ...state?.details?.client,
                [AGENT_TYPES.SELLERS]: {
                    ...state?.details?.client?.[AGENT_TYPES.SELLERS],
                    agent: {
                        ...data?.agent?.[AGENT_TYPES.SELLERS],
                    },
                    broker: {
                        ...data?.broker?.[AGENT_TYPES.SELLERS],
                    }
                }
            },
        });

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

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader pageHeader="Listing Broker and Agent Information" />
                <Broker
                    title={"Listing"}
                    represents={AGENT_TYPES.SELLERS}
                    getValues={getValues}
                    register={register}
                    errors={errors}
                />
                <Agents
                    errors={errors}
                    register={register}
                    getValues={getValues}
                    represents={AGENT_TYPES.SELLERS}
                    title={`Listing`}
                    agentType={agentType}
                />
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default ListingBroker

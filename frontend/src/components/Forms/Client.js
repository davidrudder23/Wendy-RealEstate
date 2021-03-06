import React from 'react'
import * as S from "../FormFields/FormStyled";
import { Next, Back } from "../FormFields/SharedButtons";
import { useParams } from "react-router-dom";
import FormHeader from "../FormFields/FormHeader";
import GeneralClientInformation from "../FormFields/GeneralClientInformation";
import useCustomFormHook from "../../hooks/useCustomFormHook";
import { ClientValidation } from "../../validation";
import { AGENT_TYPES, handleDeploymentPath } from "../../shared";
import { clientDefaultValues } from "../../defaultValues";

const Client = () => {
    const { clientType } = useParams();
    const { register, handleSubmit, errors, action, state, push, getValues, agentType } = useCustomFormHook(ClientValidation, clientDefaultValues(clientType));

    const onSubmit = data => {
        action({
            client: {
                ...state?.details?.client,
                [clientType]: {
                    list: [...data?.client?.[clientType]]
                },
            }
        });
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false") {
            push(handleDeploymentPath("/result"));
        } else if (agentType === AGENT_TYPES.SELLERS) {
            if (clientType === AGENT_TYPES.SELLERS) {
                push(handleDeploymentPath("/ListingBroker"));
            } else if (clientType === AGENT_TYPES.BUYERS) {
                push(handleDeploymentPath("/Agent/Buyer"));
            }
        } else if (agentType === AGENT_TYPES.BUYERS) {
            push(handleDeploymentPath("/Agent/Buyer"));
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader pageHeader={`${clientType}'s Information`}/>
                <GeneralClientInformation title={clientType} getValues={getValues} errors={errors} register={register} action={action} state={state} />
                <br />
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default Client

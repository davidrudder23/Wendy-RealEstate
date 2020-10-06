import React from 'react'
import * as S from "../FormFields/FormStyled";
import { Next, Back } from "../FormFields/SharedButtons";
import { useParams } from "react-router-dom";
import FormHeader from "../FormFields/FormHeader";
import GeneralClientInformation from "../FormFields/GeneralClientInformation";
import useCustomFormHook from "../../hooks/useCustomFormHook";
import { ClientValidation } from "../../validation";
import { AGENT_TYPES } from "../../shared";

const Client = () => {
    const { register, handleSubmit, errors, action, push, getValues, agentType } = useCustomFormHook(ClientValidation);
    const { clientType } = useParams();

    const onSubmit = data => {
        action({ client: data });
        push("/result")
        if(process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT !== "false"){
            push("/result");
        }else if(agentType === AGENT_TYPES.SELLERS){
            push("/ListingBroker");
        }else if(agentType === AGENT_TYPES.BUYERS){
            push("/BuyersAgent");
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <GeneralClientInformation title={clientType} getValues={getValues} errors={errors} register={register} />
                <br />
                <Next />
                <Back />
            </form>
        </S.Container>
    )
}

export default Client

import React from 'react'
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from '../../hooks/useCustomFormHook';
import { ClientValidation } from "../../validation";
import { handleDeploymentPath } from "../../shared";

const Testing = () => {
    const { handleSubmit, action, push, getValues, errors, register } = useCustomFormHook(ClientValidation);
    const onSubmit = data => {
        action(data);
        push(handleDeploymentPath("/result"));
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <br />
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default Testing

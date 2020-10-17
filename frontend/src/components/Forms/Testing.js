import React from 'react'
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from '../../hooks/useCustomFormHook';
import { ClientValidation } from "../../validation";
import { handleDeploymentPath } from "../../shared";
import LenderTest from './LenderTest';
import AutoComplete from '../FormFields/AutoComplete';

const Testing = () => {
    const { handleSubmit, action, push, } = useCustomFormHook(ClientValidation);
    const onSubmit = data => {
        action(data);
        push(handleDeploymentPath("/result"));
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <S.FieldWrapper>
                    <S.FieldTitle>Google Sheet AutoComplete Test</S.FieldTitle>
                    <LenderTest />
                    <AutoComplete 
                        suggestions={["george", "kate", "luna", "finnick"]}
                        useDefaultFilter={true}
                    />
                </S.FieldWrapper>
                <br />
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default Testing

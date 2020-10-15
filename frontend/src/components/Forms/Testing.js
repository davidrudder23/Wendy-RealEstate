import React from 'react'
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from '../../hooks/useCustomFormHook';
import { ClientValidation } from "../../validation";
import AutoComplete from '../FormFields/AutoComplete';
import Address from "../FormFields/Address";
import { handleDeploymentPath } from "../../shared";
import CustomDatePicker from '../FormFields/DatePicker';
import InputField from "../FormFields/InputField";

const Testing = () => {
    const { control, register, handleSubmit, errors, action, push, getValues } = useCustomFormHook(ClientValidation);
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
                </S.FieldWrapper>
                <br />
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default Testing

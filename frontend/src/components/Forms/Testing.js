import React from 'react'
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from '../../hooks/useCustomFormHook';
import { ClientValidation } from "../../validation";
import AutoComplete from '../FormFields/AutoComplete';
import Address from "../FormFields/Address";

const Testing = () => {
    const {  register, handleSubmit, errors, action, push, getValues } = useCustomFormHook(ClientValidation);
    const onSubmit = data => {
        action(data);
        push("/result");
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <S.FieldWrapper>
                    <S.FieldTitle>AutoComplete Test</S.FieldTitle>
                    <AutoComplete
                        suggestions={[
                        "George",
                        "Kate",
                        "Luna",
                        "finnick"
                        ]}
                        getValues={getValues}
                        name="testing.findValue"
                        label="Search Here"
                        errors={errors?.testing?.findValue}
                        register={register}
                        required={false}
                    />
                </S.FieldWrapper>
                <S.FieldWrapper>
                    <S.FieldTitle>Address Testing</S.FieldTitle>
                    <Address />
                </S.FieldWrapper>
                <br />
                <Next />
                <Back />
            </form>
        </S.Container>
    )
}

export default Testing

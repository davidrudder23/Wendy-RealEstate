import React from 'react'
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from '../../hooks/useCustomFormHook';
import { ClientValidation } from "../../validation";
import AutoComplete from '../FormFields/AutoComplete';
import Address from "../FormFields/Address";
import { handleDeploymentPath } from "../../shared";

const Testing = () => {
    const { register, handleSubmit, errors, action, push, getValues } = useCustomFormHook(ClientValidation);
    const onSubmit = data => {
        action(data);
        push(handleDeploymentPath("/result"));
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
                    <Address
                        getValues={getValues}
                        name="testing.address"
                        label="Search for an address"
                        errors={errors?.testing?.address}
                        register={register}
                        required={false}
                    />
                </S.FieldWrapper>
                <br />
                <Next />
                <Back />
            </form>
        </S.Container>
    )
}

export default Testing

import React from 'react'
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from '../../hooks/useCustomFormHook';
import { ClientValidation } from "../../validation";
import { handleDeploymentPath } from "../../shared";
import Tenant from '../FormFields/Tenant';

const Testing = () => {
    const { handleSubmit, action, push, getValues, errors, register, state, control } = useCustomFormHook(ClientValidation);
    const onSubmit = data => {
        action(data);
        push(handleDeploymentPath("/result"));
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <Tenant 
                    getValues={getValues}
                    errors={errors}
                    register={register}
                    state={state}
                    control={control}
                />
                <br />
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default Testing

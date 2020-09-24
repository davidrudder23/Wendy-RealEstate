import React from 'react'
import FormHeader from "../Form/FormHeader";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from 'little-state-machine';
import updateAction from '../../state/updateState';
import * as S from "../Form/FormStyled";
import RadioSelector from "../Form/RadioSelector";
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

const BuyerFormThree = () => {
    const { state, action } = useStateMachine(updateAction);
    const { push } = useHistory();
    const { register, handleSubmit, errors, watch, getValues } = useForm({
        defaultValues: state.details,
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const onSubmit = data => {
        action(data);
        push("/result");
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <S.FieldWrapper>
                    <S.FieldTitle>For Sale Buy Owner</S.FieldTitle>
                    <RadioSelector register={register} name="forSaleByOwner" required={true} array={["Yes","No"]} />
                </S.FieldWrapper>
                <S.Input type="submit" value="Next" />
            </form>
        </S.Container>
    )
}

export default BuyerFormThree

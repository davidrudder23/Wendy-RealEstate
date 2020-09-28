import React from 'react'
import FormHeader from "../Form/FormHeader";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from 'little-state-machine';
import updateAction from '../../state/updateState';
import * as S from "../Form/FormStyled";
import Slider from "../Form/Slider";
import InputField from "../Form/InputField";
import { yupResolver } from '@hookform/resolvers';
import { FSBOValidation } from "../../validation";

const ListingBroker = () => {
    const { state, action } = useStateMachine(updateAction);
    const { push } = useHistory();
    const { register, handleSubmit, errors, getValues } = useForm({
        defaultValues: state.details,
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(FSBOValidation),
    });

    const onSubmit = data => {
        action({ FSBO: data});
        push("/result");
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <S.FieldWrapper>
                    <S.MultiContainer>
                        <InputField
                        getValues={getValues}
                        name="listingBrokerCompany"
                        label="Listing Broker Company"
                        errors={errors.ListingBrokerCompany}
                        register={register}
                        required={true}
                        />
                        <InputField 
                        getValues={getValues}
                        name=""
                        label=""
                        errors={}
                        register={register}
                        required={false}
                        />
                    </S.MultiContainer>
                </S.FieldWrapper>
                <S.MultiContainer>
                    <InputField 
                    getValues={getValues}
                    name=""
                    label=""
                    errors={}
                    register={register}
                    required={true}
                    />
                    <InputField 
                    getValues={getValues}
                    name=""
                    label=""
                    errors={}
                    register={register}
                    required={true}
                    />
                </S.MultiContainer>
                <S.MultiContainer>
                    <InputField 
                    getValues={getValues}
                    name=""
                    label=""
                    errors={}
                    register={register}
                    required={true}
                    />
                    <InputField 
                    getValues={getValues}
                    name=""
                    label=""
                    errors={}
                    register={register}
                    required={true}
                    />
                </S.MultiContainer>
            </form> 
        </S.Container>
    )
}

export default ListingBroker

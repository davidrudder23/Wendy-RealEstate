import React from 'react'
import FormHeader from "../FormFields/FormHeader";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from 'little-state-machine';
import updateAction from '../../state/updateState';
import * as S from "../FormFields/FormStyled";
import InputField from "../FormFields/InputField";
import { yupResolver } from '@hookform/resolvers';
import { LendersValidation } from "../../validation";

const Lenders = () => {
    const { state, action } = useStateMachine(updateAction);
    const { push } = useHistory();
    const { register, handleSubmit, errors, getValues } = useForm({
        defaultValues: state.details,
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(LendersValidation),
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
                    <S.FieldTitle>Lender Information</S.FieldTitle>
                    <S.MultiContainer>
                        <InputField 
                        getValues={getValues}
                        name="lender.firstName"
                        label="First Name"
                        errors={errors.lender?.firstName}
                        register={register}
                        />
                        <InputField 
                        getValues={getValues}
                        name="lender.lastName"
                        label="Last Name"
                        errors={errors.lender?.lastName}
                        register={register}
                        />
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <InputField 
                        getValues={getValues}
                        name="lender.companyName"
                        label="Company Name"
                        errors={errors.lender?.company}
                        register={register}
                        />
                        <InputField 
                        getValues={getValues}
                        name="lender.phoneNumber"
                        label="Phone Number"
                        errors={errors.lender?.phoneNumber}
                        register={register}
                        />
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <InputField 
                        getValues={getValues}
                        name="lender.email"
                        label="Email"
                        errors={errors.lender?.email}
                        register={register}
                        />                        
                        <InputField 
                        getValues={getValues}
                        name="lender.emailVerification"
                        label="Email Verification"
                        errors={errors.lender?.emailVerification}
                        register={register}
                        />
                    </S.MultiContainer>
                </S.FieldWrapper>
                <S.Input type="submit" value="Next" />
            </form>
        </S.Container>
    )
}

export default Lenders

import React from 'react'
import * as S from "./FormStyled";
import InputField from "./InputField";
import * as yup from "yup";

const AgentForm = ({ errors, register, name, title,  getValues, isAttorney }) => {

    return (
        <S.FieldWrapper>
           <S.FieldTitle>{title}</S.FieldTitle>
           <S.MultiContainer>
                        <InputField
                        getValues={getValues}
                        name={`${name}_firstName`}
                        label="First Name"
                        errors={errors.x}
                        required={true}
                        register={register}
                        />
                        <InputField 
                        getValues={getValues}
                        name={`${name}_lastName`}
                        label="Last Name" 
                        errors={errors.x}
                        required={true}
                        register={register}
                        />
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <InputField
                        getValues={getValues}
                        name={`${name}_Email`}
                        label="Email Address"
                        erros={`${errors}.${name}_Email`}
                        register={register}
                        required={true}
                        />
                        <InputField
                        getValues={getValues}
                        name={`${name}_EmailVerification`}
                        label="Email Address Verification"
                        errors={`${errors}.${name}_EmailVerification`}
                        register={register}
                        required={true}
                        />
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <InputField
                        getValues={getValues}
                        name={`${name}_PhoneNumber`}
                        label="Phone Number"
                        errors={`${errors}.${name}_PhoneNumber`}
                        register={register}
                        required={false}
                        />
                        { isAttorney ?
                        <InputField
                        getValues={getValues}
                        name={`${name}_FirmName`}
                        label="Firm Name"
                        errors={`${errors}.${name}_FirmName`}
                        register={register}
                        required={false}
                        />
                        : null }
                    </S.MultiContainer>
        </S.FieldWrapper>
    )
}

export default AgentForm

import React from 'react'
import FormHeader from "../FormFields/FormHeader";
import * as S from "../FormFields/FormStyled";
// import InputField from "../FormFields/InputField";
// import { yupResolver } from '@hookform/resolvers';
// import { AdditionalInformationValidation } from "../../validation";
import { Next, Back } from "../FormFields/SharedButtons";
import { handleDeploymentPath } from "../../shared";
import useCustomFormHook from "../../hooks/useCustomFormHook";

const AdditionalInformation = () => {
    const { handleSubmit, action, push } = useCustomFormHook();
    const onSubmit = data => {
        action(data);
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false") {
            push(handleDeploymentPath("/result"));
        } else {
            push(handleDeploymentPath("/result"));
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <S.FieldWrapper>
                    <S.FieldTitle>Additional Information</S.FieldTitle>
                    {/*  */}
                    {/* TODO: Make field: Are you currently part of the tracy gagne team? */}
                    {/* TODO: Need Additional field --> create text area field to allow for longer input */}
                    {/* TODO: This is for an outside referral NOT with the Tracy Gagne Team. Is there a refereall to be paid on this transaction. */}
                </S.FieldWrapper>
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default AdditionalInformation

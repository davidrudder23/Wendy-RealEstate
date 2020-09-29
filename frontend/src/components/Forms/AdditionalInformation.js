import React from 'react'
import FormHeader from "../FormFields/FormHeader";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from 'little-state-machine';
import updateAction from '../../state/updateState';
import * as S from "../FormFields/FormStyled";
// import InputField from "../FormFields/InputField";
import { yupResolver } from '@hookform/resolvers';
import { AdditionalInformationValidation } from "../../validation";

const AdditionalInformation = () => {
    const { state, action } = useStateMachine(updateAction);
    const { push } = useHistory();
    const { register, handleSubmit, errors, getValues } = useForm({
        defaultValues: state.details,
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(AdditionalInformationValidation),
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
                    <S.FieldTitle>Additional Information</S.FieldTitle>
                    {/* 
                        TODO:
                        Team lead or Sphere not split with eXp only with the Tracy Gagne Team
                        What does this mean?
                    */}
                    {/* 
                        TODO:
                        Need Additional field --> create text area field to allow for longer input
                    */}
                    {/* 
                        Need to be able to upload documents
                    */}
                    {/* 
                        This is for an outside referral NOT with the Tracy Gagne Team
                        Is there a refereall to be paid on this transaction
                    */}
                </S.FieldWrapper>
            </form>
        </S.Container>
    )
}

export default AdditionalInformation

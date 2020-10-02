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
    const { handleSubmit } = useForm({
        defaultValues: state.details,
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(AdditionalInformationValidation),
    });

    const onSubmit = data => {
        action(data);
        if(process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT !== "false"){
            push("/result");
        }else {
            push("/result");
            // TODO: Determine what the final steps will be here
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
                <S.Input type="submit" value="Next" />
            </form>
        </S.Container>
    )
}

export default AdditionalInformation

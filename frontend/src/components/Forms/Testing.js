import React from 'react'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import InputField from "../FormFields/InputField";
import { useStateMachine } from 'little-state-machine';
import updateAction from '../../state/updateState';
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";

const Testing = () => {
    const { state, action } = useStateMachine(updateAction);
    const { push } = useHistory();
    const { register, handleSubmit, getValues, errors } = useForm({
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
                    <S.FieldTitle>Testing Data</S.FieldTitle>
                    <S.MultiContainer>
                        <InputField 
                            name="testing.firstName"
                            label="First Name"
                            required={true}
                            register={register}
                            errors={errors.testing?.firstName}
                            getValues={getValues}
                        />
                        <InputField 
                            name="testing.lastName"
                            label="Last Name"
                            required={true}
                            register={register}
                            errors={errors.testing?.lastName}
                            getValues={getValues}
                        />
                    </S.MultiContainer>
                </S.FieldWrapper>
                <S.Input type="submit" value="Next" />
            </form>
        </S.Container>
    )
}

export default Testing

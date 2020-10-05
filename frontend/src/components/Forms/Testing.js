import React from 'react'
import InputField from "../FormFields/InputField";
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from './useCustomFormHook';

const Testing = () => {
    const { register, handleSubmit, getValues, errors, action, push } = useCustomFormHook();

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
                <Next />
                <Back />
            </form>
        </S.Container>
    )
}

export default Testing

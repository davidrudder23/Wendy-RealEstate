import React, { useState } from 'react'
import FormHeader from "../FormFields/FormHeader";
import * as S from "../FormFields/FormStyled";
import InputField from "../FormFields/InputField";
import RadioSelector from "../FormFields/RadioSelector";
import Slider from "../FormFields/Slider";
// import { yupResolver } from '@hookform/resolvers';
// import { AdditionalInformationValidation } from "../../validation";
import { Next, Back } from "../FormFields/SharedButtons";
import { handleDeploymentPath } from "../../shared";
import useCustomFormHook from "../../hooks/useCustomFormHook";

// TODO: State for withTracyGagne and hasReferral do not persist
const AdditionalInformation = () => {
    const { handleSubmit, action, push, register, getValues, watch } = useCustomFormHook();
    const [withTracyGagne, setWithTracyGagne] = useState(false)
    const [hasReferral, setHasReferral] = useState(false);

    const onSubmit = data => {
        action(data);
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false") {
            push(handleDeploymentPath("/result"));
        } else {
            push(handleDeploymentPath("/result"));
        }
    }

    const renderHasReferral = () => {
        if (hasReferral) {
            return (
                <S.FieldWrapper>
                    <S.FieldTitle>Referral Information</S.FieldTitle>
                    <S.MultiContainer>
                        <InputField
                            name="referral.Agent"
                            label="Agent that Referred Client"
                            getValues={getValues}
                            register={register}
                            required={true}
                        />
                        <InputField
                            name="referral.broker"
                            label="Agent that Referred Client"
                            getValues={getValues}
                            register={register}
                            required={true}
                        />
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <InputField
                            name="referral.email"
                            label="Referring Agent Email Address"
                            getValues={getValues}
                            register={register}
                            required={true}
                        />
                        <InputField
                            name="referral.emailVerification"
                            label="Email Address Verification"
                            getValues={getValues}
                            register={register}
                            required={true}
                        />
                    </S.MultiContainer>
                    <div>
                        <InputField
                            name="referral.amount"
                            label="Amount"
                            getValues={getValues}
                            register={register}
                            required={true}
                        />
                    </div>
                </S.FieldWrapper>
            )
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader pageHeader="Additional Information" />
                <S.FieldWrapper>
                    <Slider
                        title="Are you with the Heart of the Home Team?"
                        isChecked={withTracyGagne}
                        setIsChecked={setWithTracyGagne}
                    />
                </S.FieldWrapper>
                {withTracyGagne ? <S.FieldWrapper>
                    <S.FieldTitle>Team lead or Sphere Not split with eXp only with the Heart of the Home Team.</S.FieldTitle>
                    <RadioSelector
                        register={register}
                        array={["75/25", "100"]}
                        name="additionalInformation.finalPaymentSplit"
                        other={true}
                        getValues={getValues}
                        watch={watch}
                    />
                </S.FieldWrapper> : null}
                <S.FieldWrapper>
                    <S.FieldTitle>
                        <Slider
                            title="Is there a referral to be paid for the transaction?"
                            isChecked={hasReferral}
                            setIsChecked={setHasReferral}
                        />
                    </S.FieldTitle>
                </S.FieldWrapper>
                {renderHasReferral()}
                <S.FieldWrapper>
                    <S.FieldTitle>Is there any additional information I should know?</S.FieldTitle>
                    <div>
                        <InputField
                            register={register}
                            getValues={getValues}
                            name="additionalInformation.additionalNotes"
                            label="Notes"
                            required={false}
                        />
                    </div>
                </S.FieldWrapper>
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default AdditionalInformation
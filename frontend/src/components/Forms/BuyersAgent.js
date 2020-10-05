import React from 'react'
import InputField from "../FormFields/InputField";
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { Next, Back } from "../FormFields/SharedButtons";
import { BuyerAgentInfoValidation } from "../../validation";
import useCustomFormHook from "../../hooks/useCustomFormHook";

const BuyerAgent = () => {
    const { register, handleSubmit, errors, action, push, getValues } = useCustomFormHook(BuyerAgentInfoValidation);

    const onSubmit = data => {
        action({ buyerAgentInformation: data});
        if(process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT !== "false"){
            push("/result");
        }else{
            push("/BuyersAttorney");
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)} >
                <FormHeader />
                <S.FieldWrapper>
                   <S.FieldTitle>Buyers Agent</S.FieldTitle>
                   <S.MultiContainer>
                                <InputField
                                getValues={getValues}
                                name="buyersAgentFirstName"
                                label="First Name"
                                errors={errors.buyersAgentFirstName}
                                required={true}
                                register={register}
                                />
                                <InputField 
                                getValues={getValues}
                                name="buyersAgentMLSNumber"
                                label="Agent MLS Number"
                                errors={errors.buyersAgentMLSNumber}
                                required={true}
                                register={register}
                                />
                    </S.MultiContainer>
                    <S.MultiContainer>
                                <InputField
                                getValues={getValues}
                                name="buyersAgentEmail"
                                label="Email Address"
                                erros={errors.buyersAgentEmail}
                                register={register}
                                required={true}
                                />
                                <InputField
                                getValues={getValues}
                                name="buyersAgentEmailVerification"
                                label="Email Address Verification"
                                errors={errors.buyersAgentEmailVerification}
                                register={register}
                                required={true}
                                />
                    </S.MultiContainer>
                            <div>
                                <InputField
                                getValues={getValues}
                                name="buyersAgentPhoneNumber"
                                label="Phone Number"
                                errors={errors.buyersAgentPhoneNumber}
                                register={register}
                                required={true}
                                />
                            </div>
                </S.FieldWrapper>
                <S.FieldWrapper>
                    <S.FieldTitle>Buyers Broker</S.FieldTitle>
                    <S.MultiContainer>
                                <InputField
                                getValues={getValues}
                                name="buyersAgentBrokerCompany"
                                label="Broker Company"
                                errors={errors.buyersAgentBrokerCompany}
                                register={register}
                                required={true}
                                />
                                <InputField
                                getValues={getValues}
                                name="buyersAgentBrokerAddress"
                                label="Broker Address"
                                errors={errors.buyersAgentBrokerAddress}
                                register={register}
                                required={true}
                                />
                    </S.MultiContainer>
                    {/* Buyers Agency Compensation per MLS is sellers agent only */}
                                <div>
                                    <InputField
                                    getValues={getValues}
                                    name="buyersAgentCompensationPerMLS"
                                    label="Agency Compensation per MLS"
                                    errors={errors.buyersAgentCompensationPerMLS}
                                    register={register}
                                    required={false}
                                    />
                                </div>
                </S.FieldWrapper>
                <Next />
                <Back />
            </form>
        </S.Container>
    )
}

export default BuyerAgent

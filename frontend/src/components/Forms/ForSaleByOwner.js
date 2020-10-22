import React from 'react';
import FormHeader from "../FormFields/FormHeader";
import * as S from "../FormFields/FormStyled";
import Slider from "../FormFields/Slider";
import InputField from "../FormFields/InputField";
import { FSBOValidation } from "../../validation";
import { AGENT_TYPES } from "../../shared";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from "../../hooks/useCustomFormHook";
import { handleDeploymentPath } from "../../shared";

const ForSaleByOwner = () => {
    const { register, handleSubmit, errors, action, push, getValues, agentType } = useCustomFormHook(FSBOValidation);
    const [isFSBO, setIsFSBO] = React.useState(false);

    const onSubmit = data => {
        action(data);
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false") {
            push(handleDeploymentPath("/result"));
        } else if (agentType === AGENT_TYPES.BUYERS) {
            push(handleDeploymentPath("/ListingBroker"));
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader pageHeader="For Sale By Owner" />
                <S.FieldWrapper>
                    <S.FieldTitle>For Sale Buy Owner
                        <Slider
                            isChecked={isFSBO}
                            setIsChecked={setIsFSBO}
                            register={register}
                            name="FSBO.isForSaleByOwner"
                            required={false} />
                    </S.FieldTitle>
                </S.FieldWrapper>
                {isFSBO ?
                <S.FieldWrapper>
                    <S.FieldTitle>Seller's Information</S.FieldTitle>
                    <S.MultiContainer>
                        <InputField
                            getValues={getValues}
                            name="FSBO.firstName"
                            label="First Name"
                            errors={errors["FSBO"]?.firstName}
                            register={register}
                            required={true}
                        />
                        <InputField
                            getValues={getValues}
                            name="FSBO.lastName"
                            label="Last Name"
                            errors={errors["FSBO"]?.sellerLastName}
                            register={register}
                            required={true}
                        />
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <InputField
                            getValues={getValues}
                            name="FSBO.email"
                            label="Email Address"
                            errors={errors["FSBO"]?.email}
                            register={register}
                            required={true}
                        />
                        <InputField
                            getValues={getValues}
                            name="FSBO.emailVerification"
                            label="Email Verification"
                            errors={errors["FSBO"]?.emailVerification}
                            register={register}
                            required={true}
                        />
                    </S.MultiContainer>
                </S.FieldWrapper>
                : null}
                {/* TODO: Migrate this to use Attorney.js */}
                {isFSBO ?
                    <S.FieldWrapper>
                        <S.FieldTitle>Attorney Information (This Attorney will be holding Escrow )</S.FieldTitle>
                        <S.MultiContainer>
                            <InputField
                                getValues={getValues}
                                name="FSBO.attorney.firstName"
                                label="First Name"
                                errors={errors["FSBO"]?.attorney?.firstName}
                                register={register}
                                required={true}
                            />
                            <InputField
                                getValues={getValues}
                                name="FSBO.attorney.lastName"
                                label="Last Name"
                                errors={errors["FSBO"]?.attorney?.firstName}
                                register={register}
                                required={true}
                            />
                        </S.MultiContainer>
                        <S.MultiContainer>
                            <InputField
                                getValues={getValues}
                                name="FSBO.attorney.email"
                                label="Email"
                                errors={errors["FSBO"]?.attorney?.email}
                                register={register}
                                required={true}
                            />
                            <InputField
                                getValues={getValues}
                                name="FSBO.attorney.emailVerification"
                                label="Email Verification"
                                errors={errors["FSBO"]?.attorney?.emailVerification}
                                register={register}
                                required={true}
                            />
                        </S.MultiContainer>
                        <div>
                            <InputField
                                getValues={getValues}
                                name="FSBO.attorney.phoneNumber"
                                label="Phone Number"
                                errors={errors["FSBO"]?.attorney?.phoneNumber}
                                register={register}
                                required={true}
                            />
                        </div>
                    </S.FieldWrapper>
                    : null}
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default ForSaleByOwner

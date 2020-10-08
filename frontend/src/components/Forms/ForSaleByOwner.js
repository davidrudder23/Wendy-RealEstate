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
    const [isFSBO, setIsFSBO] = React.useState(true);

    const onSubmit = data => {
        action({ FSBO: data });
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT !== "false") {
            push(handleDeploymentPath("/result"));
        } else if (agentType === AGENT_TYPES.BUYERS) {
            push(handleDeploymentPath("/ListingBroker"));
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <S.FieldWrapper>
                    <S.FieldTitle>For Sale Buy Owner
                        <Slider
                            isChecked={isFSBO}
                            setIsChecked={setIsFSBO}
                            register={register}
                            name="forSaleByOwner"
                            required={false} />
                    </S.FieldTitle>
                    {
                        isFSBO ?
                            <React.Fragment>
                                <S.MultiContainer>
                                    <InputField
                                        getValues={getValues}
                                        name="sellerFirstName"
                                        label="Sellers First Name"
                                        errors={errors.sellerFirstName}
                                        register={register}
                                        required={false}
                                    />
                                    <InputField
                                        getValues={getValues}
                                        name="sellerLastName"
                                        label="Sellers Last Name"
                                        errors={errors.sellerLastName}
                                        register={register}
                                        required={false}
                                    />
                                </S.MultiContainer>
                                <S.MultiContainer>
                                    <InputField
                                        getValues={getValues}
                                        name="sellerEmail"
                                        label="Sellers Email Address"
                                        errors={errors.sellerEmail}
                                        register={register}
                                        required={false}
                                    />
                                    <InputField
                                        getValues={getValues}
                                        name="sellerEmailVerification"
                                        label="Seller Email Verification"
                                        errors={errors.sellerEmailVerification}
                                        register={register}
                                        required={false}
                                    />
                                </S.MultiContainer>
                            </React.Fragment>
                            : null
                    }
                </S.FieldWrapper>
                {isFSBO ?
                    <S.FieldWrapper>
                        <S.FieldTitle>Attorney Information (This Attorney will be holding Escrow )</S.FieldTitle>
                        <S.MultiContainer>
                            <InputField
                                getValues={getValues}
                                name="attorneyfirstName"
                                label="First Name"
                                errors={errors.attorneyfirstName}
                                register={register}
                                required={false}
                            />
                            <InputField
                                getValues={getValues}
                                name="attorneylastName"
                                label="Last Name"
                                errors={errors.firstName}
                                register={register}
                                required={false}
                            />
                        </S.MultiContainer>
                        <S.MultiContainer>
                            <InputField
                                getValues={getValues}
                                name="attorneyEmail"
                                label="Email"
                                errors={errors.attorneyEmail}
                                register={register}
                                required={false}
                            />
                            <InputField
                                getValues={getValues}
                                name="attorneyEmailVerification"
                                label="Email Verification"
                                errors={errors.attorneyEmailVerification}
                                register={register}
                                required={false}
                            />
                        </S.MultiContainer>
                        <div>
                            <InputField
                                getValues={getValues}
                                name="attorneyPhoneNumber"
                                label="Phone Number"
                                errors={errors.attorneyPhoneNumber}
                                register={register}
                                required={false}
                            />
                        </div>
                    </S.FieldWrapper>
                    : null}
                <Next />
                <Back />
            </form>
        </S.Container>
    )
}

export default ForSaleByOwner

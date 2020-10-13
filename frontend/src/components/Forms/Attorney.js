import React from 'react'
import { useParams } from "react-router-dom";
import InputField from "../FormFields/InputField";
import Slider from "../FormFields/Slider";
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { TestAttorneyValidation } from "../../validation";
import { AGENT_TYPES } from "../../shared";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from "../../hooks/useCustomFormHook";
import { handleDeploymentPath } from "../../shared";

// TODO Create recommendation fields once google sheet complete is done
// If introduction give list of attorneys. ( cleint choose and send email to this attorney)
// I think a drop down list would be the best choice
const Attorney = () => {
    const { register, handleSubmit, errors, action, push, getValues, agentType } = useCustomFormHook(TestAttorneyValidation);
    const { represents } = useParams();
    const [hasAttorney, sethasAttorney] = React.useState(true);
    const [wantsRecommendation, setWantsRecommendation] = React.useState(false);

    const onSubmit = data => {
        action({ attorney: data });
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false") {
            push(handleDeploymentPath("/result"));
        } else if (agentType === AGENT_TYPES.SELLERS) {

            if (represents === AGENT_TYPES.SELLERS) {
                push(handleDeploymentPath(`/Client/${AGENT_TYPES.BUYERS}`));

            } else if (represents === AGENT_TYPES.BUYERS) {
                push(handleDeploymentPath("/AdditionalInformation"));
            }

        } else if (agentType === AGENT_TYPES.BUYERS) {
            push(handleDeploymentPath("/FSBO"));
        }
    }

    const askFilingClientIfTheyHaveAttorneyAndTheyWantRecommendationIfNot = () => {
        if ((agentType === AGENT_TYPES.SELLERS && represents === AGENT_TYPES.SELLERS) ||
            (agentType === AGENT_TYPES.BUYERS && represents === AGENT_TYPES.BUYERS)) {
            return (
                <React.Fragment>
                    <S.FieldWrapper>
                        <S.FieldTitle>
                            Do you have an attorney?
                            <Slider
                                isChecked={hasAttorney}
                                setIsChecked={sethasAttorney}
                                name={`${represents}.hasAttorney`}
                                register={register}
                                required={false}
                            />
                        </S.FieldTitle>
                    </S.FieldWrapper>
                    {hasAttorney ? null : 
                    <S.FieldWrapper>
                        <S.FieldTitle>
                            Would you like a recommendation and introduction?
                            <Slider 
                                isChecked={wantsRecommendation}
                                setIsChecked={setWantsRecommendation}
                                name={`${represents}.wantsRecommendationAndIntroduction`}
                                register={register}
                                required={false}
                            />
                        </S.FieldTitle>
                    </S.FieldWrapper>
                    }
                </React.Fragment>
            )
        }
    }

    const attorneyInformation = () => {
        if(hasAttorney){
        return (
            <S.FieldWrapper>
                <S.FieldTitle>{represents}'s Attorney Information</S.FieldTitle>
                <S.MultiContainer>
                    <InputField
                        getValues={getValues}
                        name={`${represents}.firstName`}
                        label="First Name"
                        errors={errors[represents]?.firstName}
                        required={true}
                        register={register}
                    />
                    <InputField
                        getValues={getValues}
                        name={`${represents}.lastName`}
                        label="Last Name"
                        errors={errors[represents]?.lastName}
                        required={true}
                        register={register}
                    />
                </S.MultiContainer>
                <S.MultiContainer>
                    <InputField
                        getValues={getValues}
                        name={`${represents}.emailAddress`}
                        label="Email"
                        errors={errors[represents]?.emailAddress}
                        required={true}
                        register={register}
                    />
                    <InputField
                        getValues={getValues}
                        name={`${represents}.emailAddressVerification`}
                        label="Email Verification"
                        errors={errors[represents]?.emailAddressVerification}
                        required={true}
                        register={register}
                    />
                </S.MultiContainer>
                <S.MultiContainer>
                    <InputField
                        getValues={getValues}
                        name={`${represents}.firmName`}
                        label="Attorney Firm Name"
                        errors={errors[represents]?.firmName}
                        required={false}
                        register={register}
                    />
                    <InputField
                        getValues={getValues}
                        name={`${represents}.phoneNumber`}
                        label="Phone number"
                        errors={errors[represents]?.phoneNumber}
                        required={false}
                        register={register}
                    />
                </S.MultiContainer>
            </S.FieldWrapper>
            )
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)} >
                <FormHeader />
                {askFilingClientIfTheyHaveAttorneyAndTheyWantRecommendationIfNot()}
                {attorneyInformation()}
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default Attorney

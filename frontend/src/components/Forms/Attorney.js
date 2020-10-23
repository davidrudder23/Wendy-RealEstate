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
import useLoadGoogleSheetInfo from '../../hooks/useLoadGoogleSheetInfo';
import AutoComplete from "../FormFields/AutoComplete";

// TODO: If introduction give list of attorneys. ( cleint choose and send email to this attorney)
// I think a drop down list would be the best choice
const Attorney = () => {
    const { register, handleSubmit, errors, action, push, getValues, agentType } = useCustomFormHook(TestAttorneyValidation);
    const { represents, param1 } = useParams();
    const [hasAttorney, sethasAttorney] = React.useState(true);
    const [wantsRecommendation, setWantsRecommendation] = React.useState(false);

    const handleSheetData = (agentSheet, componentIsMounted) => {
        if (componentIsMounted) {
            const emails = [];
            const names = [];
            const addresses = [];
            const firmNames = [];
            const phoneNumbers = [];

            let index = 1;
            while (agentSheet.getCell(index, 0).value !== null) {
                names.push(agentSheet.getCell(index, 0).value);
                emails.push(agentSheet.getCell(index, 1).value);
                phoneNumbers.push(agentSheet.getCell(index, 2).value);
                addresses.push(agentSheet.getCell(index, 3).value);
                firmNames.push(agentSheet.getCell(index, 4).value);
                index++;
            }

            const emailVerification = emails;

            setArrayData({
                Emails: emails,
                EmailVerifications: emailVerification,
                Names: names,
                PhoneNumbers: phoneNumbers,
                FirmNames: firmNames,
                Addresses: addresses,
            });
        }
    }

    const spreadSheetKey = "1ffex1Am_wSX_Rebav49Sf2plvujBbPBRkA1wPagvXL8";
    const {
        ready,
        values,
        setValues,
        arrayData,
        setArrayData
    } = useLoadGoogleSheetInfo(
        spreadSheetKey,
        0,
        'A:E',
        handleSheetData,
        {
            Email: "",
            EmailVerification: "",
            Name: "",
            PhoneNumber: "",
            FirmName: "",
            Address: "",
        }
    );

    const handleOnSelect = (e, index) => {
        setValues(data => {
            return {
                Email: arrayData.Emails[index] ? arrayData.Emails[index] : "",
                EmailVerification: arrayData.EmailVerifications[index] ? arrayData.EmailVerifications[index] : "",
                Name: arrayData.Names[index] ? arrayData.Names[index] : "",
                PhoneNumber: arrayData.PhoneNumbers[index] ? arrayData.PhoneNumbers[index] : "",
                FirmName: arrayData.FirmNames[index] ? arrayData.FirmNames[index] : "",
                Address: arrayData.Addresses[index] ? arrayData.Addresses[index] : "",
            }
        })
    }

    const onSubmit = data => {
        action(data);
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false") {
            push(handleDeploymentPath("/result"));
        } else if (agentType === AGENT_TYPES.SELLERS) {
            if (represents === AGENT_TYPES.SELLERS) {
                push(handleDeploymentPath(`/Client/${AGENT_TYPES.BUYERS}`));

            } else if (represents === AGENT_TYPES.BUYERS) {
                push(handleDeploymentPath("/AdditionalInformation"));
            }

        } else if (agentType === AGENT_TYPES.BUYERS) {
            if (param1 === "FSBO") {
                push(handleDeploymentPath("/ListingBroker"))
            } else {
                push(handleDeploymentPath("/FSBO"));
            }
        }
    }

    const askFilingClientIfTheyHaveAttorneyAndTheyWantRecommendationIfNot = () => {
        if ((agentType === AGENT_TYPES.SELLERS && represents === AGENT_TYPES.SELLERS) ||
            (agentType === AGENT_TYPES.BUYERS && represents === AGENT_TYPES.BUYERS) ||
            (param1 === 'FSBO')) {
            return (
                <React.Fragment>
                    <S.FieldWrapper>
                        <Slider
                            title="Do you have an Attorney?"
                            isChecked={hasAttorney}
                            setIsChecked={sethasAttorney}
                            name={`attorney.${represents}.hasAttorney`}
                            register={register}
                            required={false}
                        />
                    </S.FieldWrapper>
                    {hasAttorney ? null :
                        <S.FieldWrapper>
                            <Slider
                                title="Would you like a recommendation and introduction?"
                                isChecked={wantsRecommendation}
                                setIsChecked={setWantsRecommendation}
                                name={`attorney.${represents}.wantsRecommendationAndIntroduction`}
                                register={register}
                                required={false} />
                        </S.FieldWrapper>
                    }
                </React.Fragment>
            )
        }
    }

    const attorneyInformation = () => {
        if (hasAttorney) {
            return (
                <S.FieldWrapper>
                    <S.FieldTitle>{represents}'s Attorney Information</S.FieldTitle>
                    <S.MultiContainer>
                        <AutoComplete
                            value={values.Name}
                            suggestions={arrayData.Names}
                            onChange={(e) => setValues(state => {
                                e.persist();
                                return {
                                    ...state,
                                    Name: e.currentTarget?.value ? e.currentTarget?.value : "",
                                }
                            })}
                            getValues={getValues}
                            name={`attorney.${represents}.name`}
                            label="Full Name"
                            errors={errors?.attorney?.[represents]?.name}
                            required={true}
                            register={register}
                            onSelect={handleOnSelect}
                            status={ready}
                        />
                        <S.AddressWrapper>
                            <AutoComplete
                                value={values.FirmName}
                                onChange={(e) => {
                                    e.persist();
                                    setValues(state => {
                                        return {
                                            ...state,
                                            FirmName: e.currentTarget?.value ? e.currentTarget?.value : "",
                                        }
                                    })
                                }}
                                getValues={getValues}
                                name={`attorney.${represents}.firmName`}
                                label="Attorney Firm Name"
                                errors={errors?.attorney?.[represents]?.firmName}
                                required={false}
                                register={register}
                            />
                        </S.AddressWrapper>
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <AutoComplete
                            value={values.Email}
                            suggestions={arrayData.Emails}
                            onChange={(e) => setValues(state => {
                                e.persist();
                                return {
                                    ...state,
                                    Email: e.currentTarget?.value ? e.currentTarget?.value : "",
                                }
                            })}
                            getValues={getValues}
                            name={`attorney.${represents}.email`}
                            label="Email"
                            errors={errors?.attorney?.[represents]?.email}
                            required={true}
                            register={register}
                            onSelect={handleOnSelect}
                            status={ready}
                        />
                        <S.AddressWrapper>
                            <AutoComplete
                                value={values.EmailVerification}
                                onChange={(e) => {
                                    e.persist();
                                    setValues(state => {
                                        return {
                                            ...state,
                                            EmailVerification: e.currentTarget?.value ? e.currentTarget?.value : "",
                                        }
                                    })
                                }}
                                getValues={getValues}
                                name={`attorney.${represents}.emailVerification`}
                                label="Email Verification"
                                errors={errors?.attorney?.[represents]?.emailVerification}
                                required={true}
                                register={register}
                            />
                        </S.AddressWrapper>
                    </S.MultiContainer>
                    <div>
                        <InputField
                            getValues={getValues}
                            name={`attorney.${represents}.phoneNumber`}
                            label="Phone number"
                            errors={errors?.attorney?.[represents]?.phoneNumber}
                            required={false}
                            register={register}
                        />
                    </div>
                </S.FieldWrapper>
            )
        }
    }

    let pageHeader = param1 === "FSBO" ? `F.S.B.O ${represents}'s Attorney` : `${represents}'s Attorney`;

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)} >
                <FormHeader pageHeader={pageHeader} />
                {askFilingClientIfTheyHaveAttorneyAndTheyWantRecommendationIfNot()}
                {attorneyInformation()}
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default Attorney

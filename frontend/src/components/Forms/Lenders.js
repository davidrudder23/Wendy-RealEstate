import React from 'react'
import FormHeader from "../FormFields/FormHeader";
import * as S from "../FormFields/FormStyled";
import InputField from "../FormFields/InputField";
import { LendersValidation } from "../../validation";
import { AGENT_TYPES } from "../../shared";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from "../../hooks/useCustomFormHook";
import { handleDeploymentPath } from "../../shared";
import useLoadGoogleSheetInfo from "../../hooks/useLoadGoogleSheetInfo";
import AutoComplete from "../FormFields/AutoComplete";
import { LenderDefaultValues } from "../../defaultValues";

const Lenders = () => {
    const { register, handleSubmit, errors, action, push, getValues, agentType } = useCustomFormHook(LendersValidation, LenderDefaultValues);

    const handleSheetData = (agentSheet, componentIsMounted) => {
        if(componentIsMounted){
        const names = [];
        const organizations = [];
        const emails = [];

        let index = 1;
        while(agentSheet.getCell(index, 0).value !== null) {
            names.push(agentSheet.getCell(index, 0).value);
            emails.push(agentSheet.getCell(index, 1).value);
            organizations.push(agentSheet.getCell(index, 2).value);
            index++;
        }

        const emailVerifications = emails;

        setArrayData({
            Emails: emails,
            EmailVerifications: emailVerifications,
            Names: names,
            Organizations: organizations,
        });
        }
    }
    
    const spreadSheetKey = "1aRrvpEn8Qe-VugV9Qbg9U9eIYPQdku_cWM2eOMkCOj4";
    const {
        ready,
        values,
        setValues,
        arrayData,
        setArrayData
    } = useLoadGoogleSheetInfo(
        spreadSheetKey,
        0,
        'A:C',
        handleSheetData,
        {
            Email: "",
            EmailVerification: "",
            Name: "",
            Organization: "",
        }
    );

    const handleOnSelect = (e, index) => {
        setValues(data => {
            return {
                Email: arrayData.Emails[index] ? arrayData.Emails[index] : "",
                EmailVerification: arrayData.EmailVerifications[index] ? arrayData.EmailVerifications[index] : "",
                Name: arrayData.Names[index] ? arrayData.Names[index] : "",
                Organization: arrayData.Organizations[index] ? arrayData.Organizations[index] : "",
            }
        })
    }

    const onSubmit = data => {
        action(data);
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false") {
            push(handleDeploymentPath("/result"));
        } else {
            if (agentType === AGENT_TYPES.BUYERS) {
                push(handleDeploymentPath("/AdditionalInformation"));
            }
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader pageHeader={`Lender Information`} />
                <S.FieldWrapper error={errors.lender}>
                    <S.FieldTitle>Lender Information</S.FieldTitle>
                    <S.MultiContainer>
                        <AutoComplete
                            suggestions={arrayData.Names}
                            value={values.Name}
                            onChange={(e) => setValues(state => {
                                e.persist();
                                return {
                                    ...state,
                                    Name: e.currentTarget?.value ? e.currentTarget?.value : "",
                                }
                            })}
                            getValues={getValues}
                            name="lender.name"
                            label="Full Name"
                            errors={errors?.lender?.name}
                            register={register}
                            required={true}
                            onSelect={handleOnSelect}
                            status={ready}
                        />
                        <S.AddressWrapper>
                            <AutoComplete
                                value={values.Organization}
                                onChange={(e) => {
                                    e.persist();
                                    setValues(state => {
                                    return {
                                        ...state,
                                        Organization: e?.target?.value
                                    }
                                })}}
                                getValues={getValues}
                                name="lender.organization"
                                label="Organization Name"
                                errors={errors.lender?.organization}
                                register={register}
                                required={true}
                            />
                        </S.AddressWrapper>
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <AutoComplete
                            suggestions={arrayData.Emails}
                            value={values.Email}
                            onChange={(e) => setValues(state => {
                                e.persist();
                                return {
                                    ...state,
                                    Email: e.currentTarget?.value ? e.currentTarget?.value : "",
                                }
                            })}
                            getValues={getValues}
                            name="lender.email"
                            label="Email"
                            errors={errors.lender?.email}
                            register={register}
                            required={true}
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
                                        EmailVerification: e?.target?.value
                                    }
                                })}}
                                getValues={getValues}
                                name="lender.emailVerification"
                                label="Email Verification"
                                errors={errors.lender?.emailVerification}
                                register={register}
                                required={true}
                            />
                        </S.AddressWrapper>
                    </S.MultiContainer>
                    <div>
                        <InputField
                            getValues={getValues}
                            name="lender.phoneNumber"
                            label="Phone Number"
                            errors={errors.lender?.phoneNumber}
                            register={register}
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

export default Lenders

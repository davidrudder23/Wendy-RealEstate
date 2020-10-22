import React from 'react'
import InputField from "../FormFields/InputField";
import Broker from "./Broker";
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { Next, Back } from "../FormFields/SharedButtons";
import { AgentAndBrokerValidation } from "../../validation";
import useCustomFormHook from "../../hooks/useCustomFormHook";
import { AGENT_TYPES } from "../../shared";
import { useParams } from 'react-router-dom';
import { handleDeploymentPath } from "../../shared";
import useLoadGoogleSheetInfo from '../../hooks/useLoadGoogleSheetInfo';
import AutoComplete from "../FormFields/AutoComplete";

const Agent = () => {
    const { register, handleSubmit, errors, action, push, getValues, agentType } = useCustomFormHook(AgentAndBrokerValidation);
    const { represents } = useParams();

    const handleSheetData = (agentSheet, componentIsMounted) => {
        if(componentIsMounted){
        const emails = [];
        const names = [];
        const mlsNumbers = [];
        const organizations = [];
        const phoneNumbers = [];

        let index = 1;
        while(agentSheet.getCell(index, 0).value !== null) {
            names.push(agentSheet.getCell(index, 0).value);
            emails.push(agentSheet.getCell(index, 1).value);
            phoneNumbers.push(agentSheet.getCell(index, 2).value);
            organizations.push(agentSheet.getCell(index, 3).value);
            mlsNumbers.push(agentSheet.getCell(index, 4).value);
            index++;
        }

        const emailVerification = emails;

        setArrayData({
            Emails: emails,
            EmailVerifications: emailVerification,
            Names: names,
            PhoneNumbers: phoneNumbers,
            Organizations: organizations,
            MLSNumbers: mlsNumbers,
        });
        }
    }
    
    const spreadSheetKey = "1Ra6DMJkEw0BN_XBShvL-Cs-zKzBtj4ilPK7WNGLbk8Y";
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
            Organization: "",
            MLSNumber: "",
        }
    );

    const handleOnSelect = (e, index) => {
        setValues(data => {
            return {
                Email: arrayData.Emails[index] ? arrayData.Emails[index] : "",
                EmailVerification: arrayData.EmailVerifications[index] ? arrayData.EmailVerifications[index] : "",
                Name: arrayData.Names[index] ? arrayData.Names[index] : "",
                PhoneNumber: arrayData.PhoneNumbers[index] ? arrayData.PhoneNumbers[index] : values.PhoneNumber,
                Organization: arrayData.Organizations[index] ? arrayData.Organizations[index] : "",
                MLSNumber: arrayData.MLSNumbers[index] ? arrayData.MLSNumbers[index] : "",
            }
        });
    }

    const onSubmit = data => {
        action(data);
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false") {
            push(handleDeploymentPath("/result"));
        } else {
            push(handleDeploymentPath(`/Attorney/${AGENT_TYPES.BUYERS}`));
        }
    }
    
    const loadAgentPhoneNumber = () => {
        return (
            <AutoComplete
                value={values.PhoneNumber}
                onChange={(e) => {
                    e.persist();
                    setValues(state => {
                    return {
                        ...state,
                        PhoneNumber: e?.target?.value
                    }
                })}}
                getValues={getValues}
                name={`agent.${represents}.phoneNumber`}
                label="Phone Number"
                errors={errors?.agent?.[represents]?.phoneNumber}
                register={register}
                required={true}
            />
        )
    }


    const loadFieldsBasedOnAgent = () => {
        if (AGENT_TYPES.BUYERS === agentType) {
            return (
                <div>
                    {loadAgentPhoneNumber()}
                </div>
            )
        } else if (AGENT_TYPES.SELLERS === agentType) {
            return (
                <S.MultiContainer>
                    {loadAgentPhoneNumber()}
                    <InputField
                        getValues={getValues}
                        name={`agent.${represents}.compensationPerMLS`}
                        label="Agency Compensation per MLS"
                        errors={errors?.agent?.[represents]?.compensationPerMLS}
                        register={register}
                        required={true}
                    />
                </S.MultiContainer>
            )
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader pageHeader={`${represents}'s Broker and Agent`} />
                <Broker
                    title={`${represents}'s`}
                    getValues={getValues}
                    errors={errors}
                    register={register}
                    represents={represents}
                />
                <S.FieldWrapper >
                    <S.FieldTitle>{represents}'s Agent</S.FieldTitle>
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
                            name={`agent.${represents}.name`}
                            label="Name"
                            errors={errors?.agent?.[represents]?.name}
                            required={true}
                            register={register}
                            onSelect={handleOnSelect}
                            status={ready}
                        />
                        <S.AddressWrapper>
                        <AutoComplete
                            suggestions={arrayData.MLSNumbers}
                            value={values.MLSNumber}
                            onChange={(e) => setValues(state => {
                                e.persist();
                                return {
                                    ...state,
                                    MLSNumber: e.currentTarget?.value ? e.currentTarget?.value : "",
                                }
                            })}
                            getValues={getValues}
                            name={`agent.${represents}.MLSNumber`}
                            label="MLS Number"
                            errors={errors?.agent?.[represents]?.MLSNumber}
                            required={true}
                            register={register}
                            onSelect={handleOnSelect}
                            status={ready}
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
                            name={`agent.${represents}.email`}
                            label="Email Address"
                            errors={errors?.agent?.[represents]?.email}
                            register={register}
                            required={true}
                            onSelect={handleOnSelect}
                            status={ready}
                        />
                        <S.AddressWrapper>
                        <AutoComplete
                            value={values.EmailVerification}
                            onChange={(e) => setValues(state => {
                                e.persist();
                                return {
                                    ...state,
                                    EmailVerification: e.currentTarget?.value ? e.currentTarget?.value : "",
                                }
                            })}
                            getValues={getValues}
                            name={`agent.${represents}.emailVerification`}
                            label="Email Address Verification"
                            errors={errors?.agent?.[represents]?.emailVerification}
                            register={register}
                            required={true}
                            onSelect={handleOnSelect}
                            status={ready}
                        />
                        </S.AddressWrapper>
                    </S.MultiContainer>
                    {loadFieldsBasedOnAgent()}
                </S.FieldWrapper>
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default Agent

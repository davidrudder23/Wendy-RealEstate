import React from 'react'
import AutoComplete from "./AutoComplete";
import InputField from "./InputField";
import useLoadGoogleSheetInfo from '../../hooks/useLoadGoogleSheetInfo';
import * as S from "../FormFields/FormStyled";
import { AGENT_TYPES } from "../../shared";

const Agents = ({ register, errors, getValues, represents, agentType, title }) => {

    const handleSheetData = (agentSheet, componentIsMounted) => {
        if (componentIsMounted) {
            const emails = [];
            const names = [];
            const mlsNumbers = [];
            const organizations = [];
            const phoneNumbers = [];

            let index = 1;
            while (agentSheet.getCell(index, 0).value !== null) {
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
                    })
                }}
                getValues={getValues}
                name={`agent.${represents}.phoneNumber`}
                label="Phone Number"
                errors={errors?.agent?.[represents]?.phoneNumber}
                register={register}
                required={true}
            />
        )
    }
    // console.log(errors)
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
                        name={`agent.${represents}.agencyCompensationPerMLS`}
                        label="Agency Compensation per MLS"
                        errors={errors?.agent?.[represents]?.agencyCompensationPerMLS}
                        register={register}
                        required={true}
                    />
                </S.MultiContainer>
            )
        }
    }

    return (
        <S.FieldWrapper error={errors.agent}>
            <S.FieldTitle>{title} Agent</S.FieldTitle>
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
    )
}

export default Agents

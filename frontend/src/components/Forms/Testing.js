import React from 'react'
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from '../../hooks/useCustomFormHook';
import { ClientValidation } from "../../validation";
import AutoComplete from '../FormFields/AutoComplete';
import Address from "../FormFields/Address";
import { handleDeploymentPath } from "../../shared";
import CustomDatePicker from '../FormFields/DatePicker';
import InputField from "../FormFields/InputField";

const Testing = () => {
    const { control, register, handleSubmit, errors, action, push, getValues } = useCustomFormHook(ClientValidation);
    const onSubmit = data => {
        action(data);
        push(handleDeploymentPath("/result"));
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <S.FieldWrapper>
                    <S.FieldTitle>AutoComplete Test</S.FieldTitle>
                    <AutoComplete
                        suggestions={[
                            "George",
                            "Kate",
                            "Luna",
                            "finnick"
                        ]}
                        getValues={getValues}
                        name="testing.findValue"
                        label="Search Here"
                        errors={errors?.testing?.findValue}
                        register={register}
                        required={false}
                    />
                </S.FieldWrapper>
                <S.FieldWrapper>
                    <S.FieldTitle>Testing</S.FieldTitle>
                    <Address
                        getValues={getValues}
                        name="testing.address"
                        label="Search for an address"
                        errors={errors?.testing?.address}
                        register={register}
                        required={false}
                    />
                </S.FieldWrapper>
                <S.FieldWrapper error={errors["property"]?.dateHouseBuilt}>
                    <S.FieldTitle>Year Built</S.FieldTitle>
                    <CustomDatePicker
                        getValues={getValues}
                        showYearPicker={true}
                        control={control}
                        name="property.dateHouseBuilt"
                        label="Select Date Built"
                        required={true}
                        dateFormat="yyyy"
                    />
                </S.FieldWrapper>
                <S.MultiContainer>
                <InputField
                getValues={getValues}
                name="property.mlsNumber"
                label="MLS Number" 
                errors={errors["property"]?.mlsNumber} 
                register={register} 
                required={true}/>
                <InputField
                getValues={getValues}
                name="property.deedReference"
                label="Deed Reference (Book)" 
                errors={errors["property"]?.deedReference} 
                register={register} 
                required={true} />
            </S.MultiContainer>
                <br />
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default Testing

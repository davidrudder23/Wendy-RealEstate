import React, { useState } from 'react'
import * as S from "../FormFields/FormStyled";
import InputField from '../FormFields/InputField';

const Tenant = () => {
    const [count, setCount] = useState(3)

    const increaseCount = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (count < MAX_BUYERS) {
            setCount(count => count + 1);
        }
    }

    const decreaseCount = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setCount(count => count - 1);
    }

    const renderTenants = () => {
        let tenants = [];
        for (let index = 0; index < count; index++) {
            tenant.push(
                <S.MultiContainer key={index}>
                    <InputField
                        name={`client.${title}.${i}.firstName`}
                        label="First Name"
                        errors={errors?.client?.[title]?.[i]?.firstName}
                        register={register}
                        required={true}
                        getValues={getValues} />
                    <CustomDatePicker
                        getValues={getValues}
                        showYearPicker={true}
                        control={control}
                        name="property.dateHouseBuilt"
                        label="Select Date Built"
                        required={true}
                        dateFormat="yyyy/MM"
                    />
                </S.MultiContainer>
            )
        }

        return tenants;
    }

    return (
        <S.FieldWrapper>

        </S.FieldWrapper>
    )
}

export default Tenant

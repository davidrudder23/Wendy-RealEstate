import React, { useState } from 'react'
import * as S from "./FormStyled";
import * as T from "./TenantStyled";
import InputField from './InputField';
import CustomDatePicker from "./DatePicker";

const Tenant = ({getValues, state, register, errors, control}) => {
    const MAX_TEANTS = 10;
    const [count, setCount] = useState(
        state?.details?.property?.tenant?.length
        ? state?.details?.property?.tenant?.length
        : 2)

    const increaseCount = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (count < MAX_TEANTS) {
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
            tenants.push(
                <S.MultiContainer key={index}>
                    <InputField
                        name={`property.tenant.${index}.unit`}
                        label={`Unit ${index + 1}`}
                        errors={errors?.property?.tenant?.[index]?.unit}
                        register={register}
                        required={false}
                        getValues={getValues} />
                    <S.AddressWrapper>
                        <CustomDatePicker
                            getValues={getValues}
                            showMonthYearPicker={true}
                            control={control}
                            name="property.dateHouseBuilt"
                            label={`Lease end date ${index + 1}`}
                            required={false}
                            dateFormat="MM/yyyy"
                        />
                    </S.AddressWrapper>
                </S.MultiContainer>
            )
        }

        return tenants;
    }

    return (
        <S.FieldWrapper>
            <S.FieldTitle>
                Please enter what unit(s) (if any) are occupied and when their lease ends:
            </S.FieldTitle>
            {renderTenants()}
            { count === MAX_TEANTS ? null : <T.PlusBtn onClick={increaseCount} />}
            { count > 0 || MAX_TEANTS === count ? <T.MinusBtn style={{ float: "right" }} onClick={decreaseCount} /> : null}
        </S.FieldWrapper>
    )
}

export default Tenant

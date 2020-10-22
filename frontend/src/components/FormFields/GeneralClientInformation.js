import React from 'react';
import InputField from "./InputField";
import * as S from "./FormStyled"
import { ordinal_suffix_of } from "../../shared";
import Address from "../FormFields/Address";

const MAX_BUYERS = 5;
const GeneralClientInformation = ({ errors, register, getValues, title, state }) => {
    const [count, setCount] = React.useState(state?.details?.client?.[title]?.length ? state?.details?.client?.[title]?.length : 1);

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

    const fieldCount = () => {
        let fields = [];
        for (let i = 0; i < count; i++) {
            if (i === MAX_BUYERS) break;

            let error =
                errors?.client?.[title]?.[i]?.firstName ||
                errors?.client?.[title]?.[i]?.lastName ||
                errors?.client?.[title]?.[i]?.email ||
                errors?.client?.[title]?.[i]?.emailVerification ||
                errors?.client?.[title]?.[i]?.phoneNumber ||
                errors?.client?.[title]?.[i]?.fullAddress;

            fields.push(
                <S.FieldWrapper key={i} error={error}>
                    <S.FieldTitle>{ordinal_suffix_of(i + 1)} {title}</S.FieldTitle>
                    <S.MultiContainer>
                        <InputField
                            name={`client.${title}.${i}.firstName`}
                            label="First Name"
                            errors={errors?.client?.[title]?.[i]?.firstName}
                            register={register}
                            required={true}
                            getValues={getValues} />
                        <InputField
                            name={`client.${title}.${i}.lastName`}
                            label="Last Name"
                            errors={errors[`client`]?.[title]?.[i]?.lastName}
                            register={register}
                            required={true}
                            getValues={getValues} />
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <InputField
                            name={`client.${title}.${i}.email`}
                            label="Email Address"
                            errors={errors[`client`]?.[title]?.[i]?.email}
                            register={register}
                            required={true}
                            getValues={getValues} />
                        <InputField
                            name={`client.${title}.${i}.emailVerification`}
                            label="Email Address Verification"
                            errors={errors[`client`]?.[title]?.[i]?.emailVerification}
                            register={register}
                            required={true}
                            getValues={getValues} />
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <InputField
                            name={`client.${title}.${i}.phoneNumber`}
                            label="Phone Number"
                            errors={errors[`client`]?.[title]?.[i]?.phoneNumber}
                            register={register}
                            required={true}
                            getValues={getValues} />
                        <S.AddressWrapper>
                            <Address
                                name={`client.${title}.${i}.address`}
                                label="Full Address"
                                errors={errors[`client`]?.[title]?.[i]?.address}
                                register={register}
                                required={true}
                                getValues={getValues}
                            />
                        </S.AddressWrapper>
                    </S.MultiContainer>
                </S.FieldWrapper>
            )
        }
        return fields;
    }

    return (
        <>
            {fieldCount().map(value => value)}
            { count === MAX_BUYERS ? <S.Button>Max Buyer Count Reached</S.Button> : <S.Button onClick={increaseCount}>Add {title}</S.Button>}
            { count > 0 || MAX_BUYERS === count ? <S.Button style={{ float: "right" }} onClick={decreaseCount}>Remove {title}</S.Button> : null}
        </>
    )
}

export default GeneralClientInformation
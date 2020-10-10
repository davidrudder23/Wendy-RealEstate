import React from 'react';
import InputField from "./InputField";
import * as S from "./FormStyled"
import { ordinal_suffix_of } from "../../shared";
import Address from "../FormFields/Address";

// TODO: ** BUG ** When returning to this page the count is reset to 1. Determine how to fix this.
const MAX_BUYERS = 5;
const GeneralClientInformation = ({errors, register, getValues, title }) => {
    const [count, setCount] = React.useState(1);

    const increaseCount = (event) => {
        event.preventDefault();
        if(count < MAX_BUYERS){
            setCount(count => count + 1);
        }
    }

    const decreaseCount = (event) => {
        event.preventDefault();
        setCount(count => count - 1);
    }

    const fieldCount = () => {
        let fields = [];
        for(let i = 0; i < count; i++){
            
            let error =
            errors[title]?.[i]?.firstName ||
            errors[title]?.[i]?.lastName ||
            errors[title]?.[i]?.email ||
            errors[title]?.[i]?.emailVerification ||
            errors[title]?.[i]?.phoneNumber || 
            errors[title]?.[i]?.fullAddress;

            fields.push(
                <S.FieldWrapper key={i} error={error}>
                        <S.FieldTitle>{ordinal_suffix_of(i + 1)} {title}</S.FieldTitle>
                        <S.MultiContainer>
                            <InputField name={`${title}.${i}.firstName`} label="First Name" errors={errors[title]?.[i]?.firstName} register={register} required={true} getValues={getValues}/>
                            <InputField name={`${title}.${i}.lastName`} label="Last Name" errors={errors[title]?.[i]?.lastName} register={register} required={true} getValues={getValues}/>
                        </S.MultiContainer>
                        <S.MultiContainer>
                            <InputField name={`${title}.${i}.email`} label="Email Address" errors={errors[title]?.[i]?.email} register={register} required={true} getValues={getValues}/>
                            <InputField name={`${title}.${i}.emailVerification`} label="Email Address Verification" errors={errors[title]?.[i]?.emailVerification} register={register} required={true} getValues={getValues}/>
                        </S.MultiContainer>
                        <S.MultiContainer>
                            <InputField name={`${title}.${i}.phoneNumber`} label="Phone Number" errors={errors[title]?.[i]?.phoneNumber} register={register} required={true} getValues={getValues}/>
                            <S.AddressWrapper>
                                <Address 
                                name={`${title}.${i}.fullAddress`}
                                label="Full Address" 
                                errors={errors[title]?.[i]?.fullAddress} 
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
            {/* TODO: verify change worked */}
            {fieldCount().map(value => value)}
            { count === MAX_BUYERS ? <S.Button>Max Buyer Count Reached</S.Button> : <S.Button  onClick={increaseCount}>Add {title}</S.Button> }
            { count > 0 || MAX_BUYERS === count ? <S.Button style={{ float: "right" }} onClick={decreaseCount}>Remove {title}</S.Button> : null }
        </>
    )
}

export default GeneralClientInformation
import React from 'react';
import InputField from "./InputField";
import * as S from "./FormStyled"

const buyerCountToText = ["Second", "Third","Fourth","Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"];
let buyers = [];

const MultipleBuyers = ({errors, register, required, getValues }) => {
    const [buyerCount, setBuyerCount] = React.useState(0);
    const MAX_BUYERS = 9;
    const addBuyerRef = React.createRef();

    const increaseBuyerCount = (event) => {
        event.preventDefault();
        if(buyerCount < MAX_BUYERS){
            setBuyerCount(buyerCount+1);
            buyers.push(buyerCountToText[buyerCount]);
        }
    }

    const decreaseBuyerCount = (event) => {
        event.preventDefault();
        setBuyerCount(buyerCount-1);
        buyers.pop();
    }

    let firstBuyerError = 
    errors.firstBuyersFirstName && 
    errors.firstBuyersLastName && 
    errors.firstBuyersPhoneNumber && 
    errors.firstBuyersFullAddress &&
    errors.firstBuyersEmailAddress;

    return (
        <>
            <S.FieldWrapper error={firstBuyerError}>
                        <S.FieldTitle>First Buyer</S.FieldTitle>
                        <S.MultiContainer>
                            <InputField name="firstBuyerFirstName" label="First Name" errors={errors.firstBuyerFirstName} register={register} required={true} getValues={getValues}/>
                            <InputField name="firstBuyerLastName" label="Last Name" errors={errors.firstBuyerLastName} register={register} required={true} getValues={getValues}/>
                        </S.MultiContainer>
                        <S.MultiContainer>
                            <InputField name="firstBuyerEmail" label="Email Address" errors={errors.firstBuyerEmail} register={register} required={true} getValues={getValues}/>
                            <InputField name="firstBuyerEmailVerification" label="Email Address Verification" errors={errors.firstBuyerEmailVerification} register={register} required={true} getValues={getValues}/>
                        </S.MultiContainer>
                        <S.MultiContainer>
                            <InputField name="firstBuyerPhoneNumber" label="Phone Number" errors={errors.firstBuyerPhoneNumber} register={register} required={true} getValues={getValues}/>
                            <InputField name="firstBuyerFullAddress" label="Full Address" errors={errors.firstBuyerFullAddress} register={register} required={true} getValues={getValues}/>
                        </S.MultiContainer>
            </S.FieldWrapper>
            {buyers.map(value => (
                <S.FieldWrapper error={false} key={value}>
                        <S.FieldTitle>{value} Buyer</S.FieldTitle>
                        <S.MultiContainer>
                            <InputField name={`${value}BuyerFirstName`} label="First Name" errors={false} register={register} required={false} getValues={getValues} />
                            <InputField name={`${value}BuyerLastName`} label="Last Name" errors={false} register={register} required={false} getValues={getValues} />
                        </S.MultiContainer>
                        <S.MultiContainer>
                            <InputField name={`${value}BuyerPhoneNumber`} label="Phone Number" errors={false} register={register} required={false} getValues={getValues} />
                            <InputField name={`${value}BuyerEmailAddress`} label="Email Address" errors={false} register={register} required={false} getValues={getValues} />
                        </S.MultiContainer>
                        <div>
                            <InputField name={`${value}BuyerFullAddress`} label="Full Address" errors={false} register={register} required={false} getValues={getValues} />
                        </div>
            </S.FieldWrapper>
            ))}
            { buyerCount === MAX_BUYERS ? <S.Button ref={addBuyerRef}>Max Buyer Count Reached</S.Button> : <S.Button ref={addBuyerRef} onClick={increaseBuyerCount}>Add Buyer</S.Button> }
            { buyerCount > 0 || MAX_BUYERS === buyerCount ? <S.Button style={{ float: "right" }} onClick={decreaseBuyerCount}>Remove Buyer</S.Button> : null }
        </>
    )
}

export default MultipleBuyers
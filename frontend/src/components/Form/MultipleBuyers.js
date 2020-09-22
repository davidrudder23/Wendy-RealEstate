import React from 'react';
import InputField from "./InputField";
import * as S from "./FormStyled"

const buyerCountToText = ["Second", "Third","Fourth","Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"];
let buyers = ["Second"];

const MultipleBuyers = ({errors, register, required }) => {
    const [buyerCount, setBuyerCount] = React.useState(1);
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
                            <InputField name="firstBuyersFirstName" label="First Name" errors={errors.firstBuyersFirstName} register={register} required={true}/>
                            <InputField name="firstBuyersLastName" label="Last Name" errors={errors.firstBuyersLastName} register={register} required={true}/>
                        </S.MultiContainer>
                        <S.MultiContainer>
                            <InputField name="firstBuyersPhoneNumber" label="Phone Number" errors={errors.firstBuyersPhoneNumber} register={register} required={true}/>
                            <InputField name="firstBuyersEmailAddress" label="Email Address" errors={errors.firstBuyersEmailAddress} register={register} required={true}/>
                        </S.MultiContainer>
                        <div>
                            <InputField name="firstBuyersFullAddress" label="Full Address" errors={errors.firstBuyersFullAddress} register={register} required={true}/>
                        </div>
            </S.FieldWrapper>
            {buyers.map(value => (
                <S.FieldWrapper error={false} key={value}>
                        <S.FieldTitle>{value} Buyer</S.FieldTitle>
                        <S.MultiContainer>
                            <InputField name={`${value}BuyersFirstName`} label="First Name" errors={false} register={register} required={false}/>
                            <InputField name={`${value}BuyersLastName`} label="Last Name" errors={false} register={register} required={false}/>
                        </S.MultiContainer>
                        <S.MultiContainer>
                            <InputField name={`${value}BuyersPhoneNumber`} label="Phone Number" errors={false} register={register} required={false}/>
                            <InputField name={`${value}BuyersEmailAddress`} label="Email Address" errors={false} register={register} required={false}/>
                        </S.MultiContainer>
                        <div>
                            <InputField name={`${value}BuyersFullAddress`} label="Full Address" errors={errors.firstBuyersFullAddress} register={register} required={false}/>
                        </div>
            </S.FieldWrapper>
            ))}
            { buyerCount === MAX_BUYERS ? <S.Button ref={addBuyerRef}>Max Buyer Count Reached</S.Button> : <S.Button ref={addBuyerRef} onClick={increaseBuyerCount}>Add Buyer</S.Button> }
            { buyerCount > 0 || MAX_BUYERS === buyerCount ? <S.Button style={{ float: "right" }} onClick={decreaseBuyerCount}>Remove Buyer</S.Button> : null }
        </>
    )
}

export default MultipleBuyers
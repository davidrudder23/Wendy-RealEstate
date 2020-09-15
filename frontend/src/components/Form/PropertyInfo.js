import React from 'react'
import * as S from "./FormStyled"
import InputField from "./InputField";

const PropertyInfo = ({ register, errors }) => {

    const propertyInformation =
    errors.mlsNumber &&
    errors.deedReference &&
    errors.address &&
    errors.city &&
    errors.state &&
    errors.zipCode;

    return (
        <S.FieldWrapper error={propertyInformation}>
                    <S.FieldTitle>Property Information</S.FieldTitle>
                    <div style={{ display: "flex", flexDirection: "row"}}>
                        <InputField
                        name="address" 
                        label="Address" 
                        errors={errors.address} 
                        register={register} 
                        required={true} />
                        <InputField
                        name="city" 
                        label="City" 
                        errors={errors.city} 
                        register={register} 
                        required={true} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row"}}>
                        <InputField
                        name="state" 
                        label="State" 
                        errors={errors.state} 
                        register={register} 
                        required={true} />
                        <InputField
                        name="zipCode" 
                        label="Zip Code" 
                        errors={errors.zipCode} 
                        register={register} 
                        required={true} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row"}} >
                        <InputField 
                        name="mlsNumber" 
                        label="MLS Number" 
                        errors={errors.mlsNumber} 
                        register={register} 
                        required={true}/>
                        <InputField 
                        name="deedReference" 
                        label="Deed Reference (Book)" 
                        errors={errors.deedReference} 
                        register={register} 
                        required={true}/>
                    </div>
                </S.FieldWrapper>
    )
}

export default PropertyInfo

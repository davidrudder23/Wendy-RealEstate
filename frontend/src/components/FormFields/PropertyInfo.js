import React from 'react';
import * as S from "./FormStyled";
import InputField from "./InputField";
import { AGENT_TYPES } from "../../shared";

const PropertyInfo = ({ register, errors, getValues, agentType }) => {

    const propertyInformation =
    errors.mlsNumber &&
    errors.deedReference &&
    errors.address &&
    errors.city &&
    errors.state &&
    errors.zipCode &&
    errors.mapReferences;

    return (
        <S.FieldWrapper error={propertyInformation}>
            <S.FieldTitle>Property Information</S.FieldTitle>
            <S.MultiContainer>
                <InputField
                getValues={getValues}
                name="address"
                label="Address" 
                errors={errors.address} 
                register={register} 
                required={true} />
                <InputField
                getValues={getValues}
                name="city" 
                label="City" 
                errors={errors.city} 
                register={register} 
                required={true} />
            </S.MultiContainer>
            <S.MultiContainer>
                <InputField
                getValues={getValues}
                name="state" 
                label="State" 
                errors={errors.state} 
                register={register} 
                required={true} />
                <InputField
                getValues={getValues}
                name="zipCode" 
                label="Zip Code" 
                errors={errors.zipCode} 
                register={register} 
                required={true} />
            </S.MultiContainer>
            <S.MultiContainer>
                <InputField
                getValues={getValues}
                name="mlsNumber"
                label="MLS Number" 
                errors={errors.mlsNumber} 
                register={register} 
                required={true}/>
                <InputField
                getValues={getValues}
                name="deedReference"
                label="Deed Reference (Book)" 
                errors={errors.deedReference} 
                register={register} 
                required={true} />
            </S.MultiContainer>
            {
                agentType === AGENT_TYPES.SELLERS || agentType === AGENT_TYPES.BOTH ?
                <div>
                    <InputField
                    getValues={getValues}
                    name="mapReferences"
                    label="Map References (Page)"
                    errors={errors.mapReferences}
                    register={register}
                    required={true} />
                </div> : null
            }
        </S.FieldWrapper>
    )
}

export default PropertyInfo

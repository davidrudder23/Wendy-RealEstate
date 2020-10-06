import React from 'react';
import * as S from "./FormStyled";
import InputField from "./InputField";
import { AGENT_TYPES } from "../../shared";

const PropertyInfo = ({ register, errors, getValues, agentType }) => {

    const propertyInformation =
    errors["property"]?.mlsNumber ||
    errors["property"]?.deedReference ||
    errors["property"]?.address ||
    errors["property"]?.city ||
    errors["property"]?.state ||
    errors["property"]?.zipCode ||
    errors["property"]?.mapReferences;

    return (
        <S.FieldWrapper error={propertyInformation}>
            <S.FieldTitle>Property Information</S.FieldTitle>
            <S.MultiContainer>
                <InputField
                getValues={getValues}
                name="property.address"
                label="Address" 
                errors={errors["property"]?.address} 
                register={register} 
                required={true} />
                <InputField
                getValues={getValues}
                name="property.city" 
                label="City" 
                errors={errors["property"]?.city} 
                register={register} 
                required={true} />
            </S.MultiContainer>
            <S.MultiContainer>
                <InputField
                getValues={getValues}
                name="property.state" 
                label="State" 
                errors={errors["property"]?.state} 
                register={register} 
                required={true} />
                <InputField
                getValues={getValues}
                name="property.zipCode" 
                label="Zip Code" 
                errors={errors["property"]?.zipCode} 
                register={register} 
                required={true} />
            </S.MultiContainer>
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
            {
                agentType === AGENT_TYPES.SELLERS || agentType === AGENT_TYPES.BOTH ?
                <div>
                    <InputField
                    getValues={getValues}
                    name="property.mapReferences"
                    label="Map References (Page)"
                    errors={errors["property"]?.mapReferences}
                    register={register}
                    required={true} />
                </div> : null
            }
        </S.FieldWrapper>
    )
}

export default PropertyInfo

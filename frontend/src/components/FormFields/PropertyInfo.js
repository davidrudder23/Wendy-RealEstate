import React from 'react';
import * as S from "./FormStyled";
import InputField from "./InputField";
import { AGENT_TYPES } from "../../shared";
import Address from "../FormFields/Address";

const PropertyInfo = ({ register, errors, getValues, agentType }) => {

    const propertyInformation =
    errors["property"]?.mlsNumber ||
    errors["property"]?.deedReference ||
    errors["property"]?.address ||
    errors["property"]?.mapReferences;

    const handleConditionalFields = () => {
        if(agentType === AGENT_TYPES.SELLERS || agentType === AGENT_TYPES.BOTH){
            return (
                <S.MultiContainer>
                     <InputField
                    getValues={getValues}
                    name="property.mapReferences"
                    label="Map References (Page)"
                    errors={errors["property"]?.mapReferences}
                    register={register}
                    required={true} />
                    <InputField
                    getValues={getValues}
                    name="property.deedReference"
                    label="Deed Reference (Book)" 
                    errors={errors["property"]?.deedReference} 
                    register={register}
                    required={true} />
                </S.MultiContainer>
            )
        }else{
            return (
            <div>
                <InputField
                getValues={getValues}
                name="property.deedReference"
                label="Deed Reference (Book)" 
                errors={errors["property"]?.deedReference} 
                register={register}
                required={true} />
            </div>
            )
        }
    }

    return (
        <S.FieldWrapper error={propertyInformation}>
            <S.FieldTitle>Property Information</S.FieldTitle>
            <S.MultiContainer>
                    <InputField
                    getValues={getValues}
                    name="property.mlsNumber"
                    label="MLS Number" 
                    errors={errors["property"]?.mlsNumber} 
                    register={register} 
                    required={true}/>
                <S.AddressWrapper>
                    <Address
                    getValues={getValues}
                    name="property.address"
                    label="Address" 
                    errors={errors["property"]?.address} 
                    register={register} 
                    required={true} />
                </S.AddressWrapper>
            </S.MultiContainer>
            {handleConditionalFields()}
        </S.FieldWrapper>
    )
}

export default PropertyInfo

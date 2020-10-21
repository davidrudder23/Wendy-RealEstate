import React from 'react'
import * as S from "../FormFields/FormStyled";
import FormHeader from "../FormFields/FormHeader";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from '../../hooks/useCustomFormHook';
import { ClientValidation } from "../../validation";
import { handleDeploymentPath } from "../../shared";
import AutoComplete from '../FormFields/AutoComplete';
import Address from '../FormFields/Address';
import InputField from "../FormFields/InputField"

const Testing = () => {
    const { handleSubmit, action, push, getValues, errors, register } = useCustomFormHook(ClientValidation);
    const onSubmit = data => {
        action(data);
        push(handleDeploymentPath("/result"));
    }

    const [controlData, setControlData] = React.useState("")

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <S.FieldWrapper>
                    <S.FieldTitle>Google Sheet AutoComplete Test</S.FieldTitle>
                    <div>
                        <AutoComplete
                            label="control group"
                            suggestions={["george", "kate", "luna", "finnick"]}
                            useDefaultFilter={true}
                            value={controlData}
                            onChange={(e) => setControlData(e.currentTarget.value)}
                        />
                    </div>
                    <S.MultiContainer>
                        <InputField
                        getValues={getValues}
                        name="property.mlsNumber"
                        label="MLS Number" 
                        errors={errors["property"]?.mlsNumber}
                        register={register} 
                        required={true} />
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
                </S.FieldWrapper>
                <br />
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default Testing

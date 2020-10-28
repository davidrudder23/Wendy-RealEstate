import React from 'react';
import * as S from "../FormFields/FormStyled";
import InputField from "../FormFields/InputField";
import FormHeader from "../FormFields/FormHeader";
import DropDownList from "../FormFields/DropDownList";
import Slider from "../FormFields/Slider";
import PropertyInfo from "../FormFields/PropertyInfo";
import CustomDatePicker from '../FormFields/DatePicker';
import RadioSelector from "../FormFields/RadioSelector";
import { PropertyValidation } from "../../validation";
import { PROPERTY_TYPES, AGENT_TYPES, handleDeploymentPath } from "../../shared";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from "../../hooks/useCustomFormHook";
import Tenant from '../FormFields/Tenant';
import { propertyDefaultValues } from "../../defaultValues";

const Property = () => {
    const { register, control, handleSubmit, errors, action, push, getValues, agentType, state, watch} = useCustomFormHook(PropertyValidation, propertyDefaultValues);

    let propertyType = watch(`property.propertyType`);
    const [currPropertyType, setCurrentPropertyType] = React.useState(propertyType ? propertyType : "");
    
    let secondOffer = watch(`property.buyerHasSubmittedAdditionalOffer`);
    const [additionalOffer, setAdditionalOffer] = React.useState(secondOffer ? secondOffer : false);

    let inspectionWavedWatch = watch(`property.inspectionWaved`);
    const [inspectionWaved, setInspectionWaved] = React.useState(inspectionWavedWatch ? inspectionWavedWatch : false);

    const onSubmit = data => {
        action(data);
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false") {
            push(handleDeploymentPath("/result"));
        } else {
            push(handleDeploymentPath("/Mortgage"));
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader pageHeader="Property Information" />
                <PropertyInfo agentType={agentType} getValues={getValues} errors={errors} register={register} />
                <S.FieldWrapper error={errors["property"]?.propertyType}>
                    <S.FieldTitle>Property Type</S.FieldTitle>
                    <DropDownList
                        placeholder="Property Types"
                        name="property.propertyType"
                        label="Select a Property Type"
                        errors={errors["property"]?.propertyType}
                        options={Object.values(PROPERTY_TYPES)}
                        register={register}
                        isValue={currPropertyType}
                        setValue={setCurrentPropertyType}
                        />
                </S.FieldWrapper>
                {currPropertyType === "Condo" ?
                    <S.FieldWrapper error={errors["property"]?.condoManagementCompany}>
                        <S.FieldTitle>Who is the Condo Management Company</S.FieldTitle>
                        <div>
                            <InputField
                                getValues={getValues}
                                name="property.condoManagementCompany"
                                label="Management Company"
                                errors={errors["property"]?.condoManagementCompany}
                                register={register}
                                required={true}
                            />
                        </div>
                    </S.FieldWrapper>
                    : null
                }
                {currPropertyType === PROPERTY_TYPES.MULTI_FAMILY ?
                    <Tenant 
                    getValues={getValues}
                    errors={errors}
                    register={register}
                    state={state}
                    control={control}
                /> : null }
                {agentType === AGENT_TYPES.SELLERS || agentType === AGENT_TYPES.BOTH ?
                    <S.FieldWrapper error={errors["property"]?.vacentOrOccupied}>
                        <S.FieldTitle>Is the house vacant or occupied?</S.FieldTitle>
                        <RadioSelector
                            register={register}
                            name="property.vacentOrOccupied"
                            array={["Vacant", "Occupied"]}
                        />
                    </S.FieldWrapper>
                    : null}
                <S.FieldWrapper error={errors["property"]?.dateHouseBuilt}>
                    <S.FieldTitle>Year Built</S.FieldTitle>
                    <CustomDatePicker
                        getValues={getValues}
                        showYearPicker={true}
                        control={control}
                        name="property.dateHouseBuilt"
                        label="Select Date Built"
                        required={true}
                        dateFormat="yyyy"
                    />
                </S.FieldWrapper>
                <S.FieldWrapper error={errors["property"]?.titleOrTownSewer}>
                    <S.FieldTitle>Is there a Title V or Town Sewer</S.FieldTitle>
                    <RadioSelector
                        register={register}
                        name="property.titleOrTownSewer"
                        array={["Title V", "Public Sewer"]}
                    />
                </S.FieldWrapper>
                <S.FieldWrapper error={errors["property"]?.publicOrTownWater}>
                    <S.FieldTitle>Public or Town Water</S.FieldTitle>
                    <RadioSelector
                        register={register}
                        name="property.publicOrTownWater"
                        array={["Town Water", "Private Water"]}
                    />
                </S.FieldWrapper>
                <S.FieldWrapper error={errors["property"]?.inspectionWaved || errors["property"]?.inspectionDeadline}>
                    <Slider
                        title="Inspection Waved"
                        isChecked={inspectionWaved}
                        setIsChecked={setInspectionWaved}
                        name="property.isInspectionWaved"
                        register={register}
                        required={false} />
                    {inspectionWaved ? null :
                        <CustomDatePicker
                            getValues={getValues}
                            control={control}
                            name="property.inspectionDeadline"
                            label="Select Inspection Deadline"
                            required={true}
                        />}
                </S.FieldWrapper>
                {agentType === AGENT_TYPES.SELLERS || agentType === AGENT_TYPES.BOTH
                    ? <S.FieldWrapper error={errors["property"]?.loxBoxCode}>
                        <S.FieldTitle>Lox Box Code</S.FieldTitle>
                        <div>
                            <InputField
                                getValues={getValues}
                                name="property.loxBoxCode"
                                label="Lox Box Code"
                                errors={errors["property"]?.loxBoxCode}
                                required={true}
                                register={register}
                            />
                        </div>
                    </S.FieldWrapper> : null}
                {
                    /* TODO: This is currently used to determine what type of email should be sent.
                        Note: Refer to Wendy Email for Message differences.
                    */
                }
                {agentType === AGENT_TYPES.BUYERS || agentType === AGENT_TYPES.BOTH ?
                    <S.FieldWrapper error={errors["property"]?.buyerHasSubmittedAdditionalOffer}>
                        <Slider
                            title="Has the buyer submitted an offer for another property?"
                            isChecked={additionalOffer}
                            setIsChecked={setAdditionalOffer}
                            name="property.buyerHasSubmittedAdditionalOffer"
                            register={register}
                            required={false}
                        />
                    </S.FieldWrapper> : null}
                <Back />
                <Next />
            </form>
        </S.Container>
    );
}

export default Property
import React from 'react';
import { useForm } from "react-hook-form";
import * as S from "../FormFields/FormStyled";
import InputField from "../FormFields/InputField";
import FormHeader from "../FormFields/FormHeader";
import DropDownList from "../FormFields/DropDownList";
import MultipleBuyers from '../FormFields/MultipleBuyers';
import Slider from "../FormFields/Slider";
import PropertyInfo from "../FormFields/PropertyInfo";
import CustomDatePicker from '../FormFields/DatePicker';
import RadioSelector from "../FormFields/RadioSelector";
import { useStateMachine } from 'little-state-machine';
import updateAction from '../../state/updateState';
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers";
import { BuyerFormOneValidation } from "../../validation";
import { PROPERTY_TYPES, AGENT_TYPES } from "../../shared";

const Property = () => {
    const { state, action } = useStateMachine(updateAction);
    const agentType = state.details.agentType;
    const { push } = useHistory();
    const { register, handleSubmit, errors, control, getValues } = useForm({
        defaultValues: state.details.property,
        // resolver: yupResolver(BuyerFormOneValidation),
        mode: 'onSubmit',
        reValidateMode: "onChange"
    });

    const [currPropertyType, setCurrentPropertyType] = React.useState("");
    const [additionalOffer, setAdditionalOffer] = React.useState(false);
    const [inspectionWaved, setInspectionWaved] = React.useState(false);

    const onSubmit = data => {
        action({property: data});
        console.log(process.env.REACT_APP_ENABLE_REDIRECT)
        // This is currently here for testing each page individually and will need to be disabled in production
        if(process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT !== "false"){
            push("/result");
        }else{
            push("/Mortgage");
        }
    }

    return (
        // "handleSubmit" will validate your inputs before invoking "onSubmit"
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <PropertyInfo agentType={agentType} getValues={getValues} errors={errors} register={register}/>
                <MultipleBuyers getValues={getValues} errors={errors} register={register} />
                <S.FieldWrapper errors={errors.propertyType}>
                        <S.FieldTitle>Property Type</S.FieldTitle>
                        <DropDownList
                        placeholder="Property Types"
                        name="propertyType" 
                        label="Select a Property Type" 
                        errors={errors.propertyType} 
                        options={PROPERTY_TYPES} 
                        register={register}
                        isValue={currPropertyType}
                        setValue={setCurrentPropertyType} />
                </S.FieldWrapper>
                { currPropertyType === "Condo" ?
                <S.FieldWrapper error={errors.condoManagementCompany}>
                    <S.FieldTitle>Who is the Condo Management Company</S.FieldTitle>
                    <div>
                        <InputField
                        getValues={getValues}
                        name="condoManagementCompany" 
                        label="Management Company" 
                        errors={errors.condoManagementCompany}
                        register={register}
                        required={true}
                        />
                    </div>
                </S.FieldWrapper>
                : null
                }
                { agentType === AGENT_TYPES.SELLERS || agentType === AGENT_TYPES.BOTH ?
                    <S.FieldWrapper error={errors.vacentOrOccupied}>
                        <S.FieldTitle>Is the house vacant or occupied?</S.FieldTitle>
                        <RadioSelector 
                            register={register}
                            name="vacentOrOccupied"
                            required={true}
                            array={["Vacant","Occupied"]}
                        />
                    </S.FieldWrapper>
                : null }
                <S.FieldWrapper>
                        <S.FieldTitle>Year Built</S.FieldTitle>
                        <CustomDatePicker
                        getValues={getValues}
                        showYearPicker={true}
                        control={control} 
                        name="dateHouseBuilt" 
                        label="Select Date Built" 
                        required={true}
                        dateFormat="yyyy"
                        />
                </S.FieldWrapper>
                <S.FieldWrapper error={errors.titleOrTownSewer} >
                        <S.FieldTitle>Is there a Title V or Town Sewer</S.FieldTitle>
                        <RadioSelector 
                        register={register} 
                        name="titleOrTownSewer" 
                        required={false} 
                        array={["Title V","Public Sewer"]}
                        />
                </S.FieldWrapper>
                <S.FieldWrapper error={errors.publicOrTownWater} >
                        <S.FieldTitle>Public or Town Water</S.FieldTitle>
                        <RadioSelector
                        register={register}
                        name="publicOrTownWater" 
                        required={false}
                        array={["Town Water","Private Water"]}
                        />
                </S.FieldWrapper>
                <S.FieldWrapper>
                        <S.FieldTitle>Inspection Waved
                            <Slider 
                            isChecked={inspectionWaved}
                            setIsChecked={setInspectionWaved}
                            name="isInspectionWaved" 
                            register={register}
                            required={false}
                            />
                        </S.FieldTitle>
                            { inspectionWaved ? null :
                            <CustomDatePicker
                            getValues={getValues}
                            control={control} 
                            name="inspectionDeadline" 
                            label="Select Inspection Deadline" 
                            required={true}
                            />}
                </S.FieldWrapper>
                { agentType === AGENT_TYPES.SELLERS || agentType === AGENT_TYPES.BOTH
                ? <S.FieldWrapper>
                    <S.FieldTitle>Lox Box Code</S.FieldTitle>
                    <div>
                        <InputField 
                            getValues={getValues}
                            name="loxBoxCode"
                            label="Lox Box Code"
                            errors={errors.loxBoxCode}
                            required={true}
                            register={register}
                        />
                    </div>
                </S.FieldWrapper> : null}
                { agentType === AGENT_TYPES.BUYERS || agentType === AGENT_TYPES.BOTH ? 
                <S.FieldWrapper>
                    <S.FieldTitle>Has The buyer Submitted an offer for another property? 
                        <Slider 
                        isChecked={additionalOffer}
                        setIsChecked={setAdditionalOffer}
                        name="buyerHasSubmittedAdditionalOffer" 
                        register={register}
                        required={false}
                        />
                    </S.FieldTitle>
                </S.FieldWrapper> : null}
                <S.Input type="submit" value="Next" />
            </form>
        </S.Container>
    );
}

export default Property
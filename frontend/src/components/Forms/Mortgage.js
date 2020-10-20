import React from 'react'
import { MortgageValidation } from "../../validation";
import * as S from "../FormFields/FormStyled";
import DropDownList from "../FormFields/DropDownList";
import { MORTGAGE_TYPES } from "../../shared";
import CustomDatePicker from '../FormFields/DatePicker';
import InputField from "../FormFields/InputField";
import Slider from "../FormFields/Slider";
import FormHeader from '../FormFields/FormHeader';
import { AGENT_TYPES } from "../../shared";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from "../../hooks/useCustomFormHook";
import { handleDeploymentPath } from "../../shared";

const Mortgage = () => {
    const { register, control, handleSubmit, errors, action, push, getValues, agentType } = useCustomFormHook(MortgageValidation);

    const onSubmit = data => {
        action(data);
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false") {
            push(handleDeploymentPath("/result"));
        } else {
            if (agentType === AGENT_TYPES.SELLERS) {
                push(handleDeploymentPath("/Client/Seller"));
            }
            if (agentType === AGENT_TYPES.BUYERS) {
                push(handleDeploymentPath("/Client/Buyer"))
            }
        }
    }

    const [currMortgageType, setCurrMortgageType] = React.useState("");
    //TODO: State doesn't persist on return
    const [isConcessions, setIsConcessions] = React.useState(false);

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <S.FieldWrapper error={errors['mortgage']?.typeOfMortgage}>
                    <S.FieldTitle>What Type of Mortgage</S.FieldTitle>
                    <DropDownList
                        placeholder="Mortgage Types"
                        name="mortgage.typeOfMortgage"
                        label="Select a Mortgage Type"
                        errors={errors['mortgage']?.typeOfMortgage}
                        options={Object.values(MORTGAGE_TYPES)}
                        register={register}
                        isValue={currMortgageType}
                        setValue={setCurrMortgageType}
                    />
                </S.FieldWrapper>
                <S.FieldWrapper error={errors?.purchasePrice}>
                    <S.FieldTitle>Purchase Price</S.FieldTitle>
                    <div>
                        <InputField
                            getValues={getValues}
                            name="mortgage.purchasePrice"
                            label="Purchase price?"
                            errors={errors['mortgage']?.purchasePrice}
                            register={register}
                            required={true}
                        />
                    </div>
                </S.FieldWrapper>
                <S.FieldWrapper error={errors['mortgage']?.firstDeposit || errors['mortgage']?.secondDeposit}>
                    <S.FieldTitle>Deposit Information</S.FieldTitle>
                    <S.MultiContainer>
                        <InputField
                            getValues={getValues}
                            name="mortgage.firstDeposit"
                            label="First Deposit Amount?"
                            errors={errors['mortgage']?.firstDeposit}
                            register={register}
                            required={true}
                        />
                        <InputField
                            getValues={getValues}
                            name="mortgage.secondDeposit"
                            label="Second Deposit Amount?"
                            errors={errors['mortgage']?.secondDeposit}
                            register={register}
                            required={false}
                        />
                    </S.MultiContainer>
                </S.FieldWrapper>
                <S.FieldWrapper error={errors['mortgage']?.areConcessions || errors['mortgage']?.concessions}>
                    <S.FieldTitle>Are there concessions?
                        <Slider
                            isChecked={isConcessions}
                            setIsChecked={setIsConcessions}
                            name="mortgage.areConcessions"
                            required={false}
                            register={register}
                        />
                    </S.FieldTitle>
                    {isConcessions ?
                        <div>
                            <InputField
                                getValues={getValues}
                                name="mortgage.concessions"
                                label="What are the concessions?"
                                errors={errors['mortgage']?.concessions}
                                register={register}
                                required={true}
                            />
                        </div>
                        : null}
                </S.FieldWrapper>
                {getValues(`mortgage.typeOfMortgage`) !== MORTGAGE_TYPES.CASH ?
                    <S.FieldWrapper error={errors['mortgage']?.mortgageCommitmentDeadline}>
                        <S.FieldTitle>Mortgage Commitment Deadline</S.FieldTitle>
                        <CustomDatePicker
                            control={control}
                            getValues={getValues}
                            name="mortgage.mortgageCommitmentDeadline"
                            label="Select Mortgage Commitment Date"
                            required={true}
                        />
                    </S.FieldWrapper>
                    : null}
                <S.FieldWrapper error={errors['mortgage']?.houseClosingDate}>
                    <S.FieldTitle>Closing Date</S.FieldTitle>
                    <CustomDatePicker
                        control={control}
                        getValues={getValues}
                        name="mortgage.houseClosingDate"
                        label="Select Closing Date"
                        required={true}
                    />
                </S.FieldWrapper>
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default Mortgage

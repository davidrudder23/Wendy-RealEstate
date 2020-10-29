import React from 'react';
import FormHeader from "../FormFields/FormHeader";
import * as S from "../FormFields/FormStyled";
import Slider from "../FormFields/Slider";
import { FSBOClientValidation } from "../../validation";
import { AGENT_TYPES } from "../../shared";
import { Next, Back } from "../FormFields/SharedButtons";
import useCustomFormHook from "../../hooks/useCustomFormHook";
import { handleDeploymentPath } from "../../shared";
import GeneralClientInformation from "../FormFields/GeneralClientInformation";
import { FSBODefaultValuesPage1 } from "../../defaultValues";

const ForSaleByOwner = () => {
    const { register, handleSubmit, errors, action, push, getValues, agentType, state } = useCustomFormHook(FSBOClientValidation, FSBODefaultValuesPage1);
    const [isFSBO, setIsFSBO] = React.useState(
        state?.details?.FSBO?.isForSaleByOwner === `true` ? true : false
    );

    const onSubmit = data => {
        action(data);
        if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_ENABLE_REDIRECT === "false") {
            push(handleDeploymentPath("/result"));
        } else if (agentType === AGENT_TYPES.BUYERS) {
            if (isFSBO) {
                push(handleDeploymentPath("/Attorney/Seller/FSBO"))
            } else {
                push(handleDeploymentPath("/ListingBroker"));
            }
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader pageHeader="For Sale By Owner" />
                <S.FieldWrapper>
                    <Slider
                        title="For Sale Buy Owner"
                        isChecked={isFSBO}
                        setIsChecked={setIsFSBO}
                        register={register}
                        name="FSBO.isForSaleByOwner"
                        required={false} />
                </S.FieldWrapper>
                {isFSBO ?
                    <React.Fragment>
                        <GeneralClientInformation
                            title={AGENT_TYPES.SELLERS}
                            getValues={getValues}
                            errors={errors}
                            register={register}
                            state={state} />
                        <br />
                    </React.Fragment>
                    : null}
                <Back />
                <Next />
            </form>
        </S.Container>
    )
}

export default ForSaleByOwner

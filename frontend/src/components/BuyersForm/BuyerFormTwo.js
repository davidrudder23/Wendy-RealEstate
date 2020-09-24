import React from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers";
// import { BuyerFormTwoValidation } from "../validation";
import { useStateMachine } from 'little-state-machine';
import updateAction from '../../state/updateState';
import * as S from "../Form/FormStyled";
import FormHeader from "../Form/FormHeader";
import AgentForm from '../Form/AgentForm';
import { yupResolver } from '@hookform/resolvers';

const BuyerFormTwo = () => {
    const { state, action } = useStateMachine(updateAction);
    const { push } = useHistory();
    const [validationRules, setValidationRules] = React.useState(yup.object().shape());
    const { register, handleSubmit, errors, getValues } = useForm({
        defaultValues: state.details,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(validationRules)
    });

    const updateValidationRules = (rules) => {
        setValidationRules(validationRules.concat(rules));
    }

    const onSubmit = data => {
        action(data);
        push("/BT3");
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <AgentForm getValues={getValues} rules={updateValidationRules} errors={errors} name="Buyers" register={register} isAttorney={true} title="Buyers Attorney Information" />
                <S.Input type="submit" value="Next" />
            </form>
        </S.Container>
    )
}

export default BuyerFormTwo

// List of fields needed:

// <<Buyers Agent First Name>>
// <<Buyers Agent MLS Number>>
// <<Buyers Agent License Number>>
// <<Buyers Agent Email>>
// <<Buyers Agency Compensation per MLS>>

// <<Attorney First Name>>
// <<Attorney Last Name>>
// <<Attorney Email Address>>
// <<Attorney Firm Name>>
// <<Attorney Phone Number>>

// <<Is this a FSBO (For Sale By Owner)?>>
// <<Sellers First Name>>
// <<Sellers Last Name>>
// <<Sellers Email Address>>
// <<Sellers Attorney name ( This attorney will be holding escrow )>>
// <<Sellers Attorney Phone Number>>
// <<Sellers Attorney Email >>

// <<Listing Broker Company>>
// <<Listing Broker Address>>
// <<List agent First Name>>
// <<Listing Agent Phone Number>>
// <<Listing Agent Email>>

// <<Lenders Name (First name only)>>
// <<Lenders Name (Last name only)>>
// <<Lender Company Name>>
// <<Lenders Phone Number>>
// <<Lenders Email>>

// <<Transaction Coordinator>>
// <<Transaction Coordinator Email Address>>

// <<Team lead or Sphere Not split with eXp only with the Tracy Gagne Team>>
// <<Notes (is there anything else I should know)>>
// <<Documents for File>>
// <<Is there a Referral to be paid on this transaction?>>

// <<Name of Client>>
// <<Agent that Referred this client>>
// <<Broker of Agent that Referred this client>>
// <<Referring agent email address>>
// <<Referral amount>>
// <<Confirmed Inspection Date>>
// <<Confirmed Inspection Time>>
// <<Confirmed Closing Date>>
// <<Confirmed Closing Time>>
// <<Buyers Agent Phone>>
// <<List agent Last Name>>
// <<Buyers Agent Broker Company>>
// <<Buyers Agent Broker Address>>
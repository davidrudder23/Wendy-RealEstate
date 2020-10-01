import React from 'react'
import FormHeader from "../FormFields/FormHeader";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from 'little-state-machine';
import updateAction from '../../state/updateState';
import * as S from "../FormFields/FormStyled";
import InputField from "../FormFields/InputField";
import { yupResolver } from '@hookform/resolvers';
import { ListingBrokerValidation } from "../../validation";
import { AGENT_TYPES } from "../../shared";

const ListingBroker = () => {
    const { state, action } = useStateMachine(updateAction);
    const agentType = state.details.agentType;
    const { push } = useHistory();
    const { register, handleSubmit, errors, getValues } = useForm({
        defaultValues: state.details,
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(ListingBrokerValidation),
    });

    console.log(state)

    const onSubmit = data => {
        action(data);
        if(!process.env.ENABLE_REDIRECT && (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')){
            push("/result");
        }else {
            if(agentType === AGENT_TYPES.SELLERS){
                console.log("See notebook notes for BuyersSection information")
                // push("BuyersSection");
            }
            if(agentType === AGENT_TYPES.BUYERS){
               
            }
        }
    }

    return (
        <S.Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader />
                <S.FieldWrapper>
                    <S.FieldTitle>Listing Broker</S.FieldTitle>
                    <S.MultiContainer>
                        <InputField
                        getValues={getValues}
                        name="listingBroker.company"
                        label="Company"
                        errors={errors.listingBroker?.company}
                        register={register}
                        />
                        <InputField 
                        getValues={getValues}
                        name="listingBroker.address"
                        label="Address"
                        errors={errors.listingBroker?.address}
                        register={register}
                        />
                    </S.MultiContainer>
                </S.FieldWrapper>
                <S.FieldWrapper>
                    <S.FieldTitle>Listing Agent</S.FieldTitle>
                    <S.MultiContainer>
                        <InputField 
                        getValues={getValues}
                        name="listingAgent.firstName"
                        label="First Name"
                        errors={errors.listingAgent?.firstName}
                        register={register}
                        />
                        <InputField 
                        getValues={getValues}
                        name="listingAgent.lastName"
                        label="Last Name"
                        errors={errors.listingAgent?.lastName}
                        register={register}
                        />
                    </S.MultiContainer>
                    <S.MultiContainer>
                        <InputField 
                        getValues={getValues}
                        name="listingAgent.email"
                        label="Email"
                        errors={errors.listingAgent?.email}
                        register={register}
                        />
                        <InputField 
                        getValues={getValues}
                        name="listingAgent.emailVerification"
                        label="Email Verification"
                        errors={errors.listingAgent?.emailVerification}
                        register={register}
                        />
                    </S.MultiContainer>
                    <div>
                        <InputField 
                        getValues={getValues}
                        name="listingAgent.phoneNumber"
                        label="Phone Number"
                        errors={errors.listingAgent?.phoneNumber}
                        register={register}
                        />
                    </div>
                </S.FieldWrapper>
                
                <S.Input type="submit" value="Next" />
            </form> 
        </S.Container>
    )
}

export default ListingBroker

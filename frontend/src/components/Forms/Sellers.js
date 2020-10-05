import React from 'react'
import { Next, Back } from "../FormFields/SharedButtons";
// import useCustomFormHook from "../../hooks/useCustomFormHook";

// TODO: Build Page
// This page is very similar to buyers information and MultipleBuyers page under formfields could be utilized in both.
// This will require some level of refactoring as well to ensure that validation rules continue to work and additional buyers and
// sellers are correctly recorded or removed if fields are empty
const Sellers = () => {
    // const { register, control, handleSubmit, errors, action, push, getValues, agentType, state } = useCustomFormHook(BuyerFormOneValidation);

    return (
        <form>
            
            <Next />
            <Back />
        </form>
    )
}

export default Sellers

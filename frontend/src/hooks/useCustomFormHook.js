import React from "react"
import { useHistory } from "react-router-dom";
import { useStateMachine } from 'little-state-machine';
import updateAction from '../state/updateState';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";


const useCustomFormHook =  (validationRules = null) => {
    const { state, action } = useStateMachine(updateAction);
    const { push } = useHistory();
    const { register, handleSubmit, getValues, errors, control } = useForm({
        defaultValues: state.details,
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: (validationRules && process.env.REACT_APP_ENABLE_VALIDATION === 'true') ? yupResolver(validationRules) : null
    });
    const agentType = state.details.agentType ? state.details.agentType : null

    React.useEffect(() => {
        return () => {
            
        }

    }, [])
    
    return {
        register,
        control,
        handleSubmit,
        getValues,
        errors,
        action,
        push,
        state,
        agentType
    }
} 

export default useCustomFormHook
import { useHistory } from "react-router-dom";
import { useStateMachine } from 'little-state-machine';
import updateAction from '../state/updateState';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";


const useCustomFormHook =  (validationRules, defaultVals) => {
    const { state, action } = useStateMachine(updateAction);
    const agentType = state.details.agentType ? state.details.agentType : null
    const { push } = useHistory();
    const { register, handleSubmit, getValues, errors, control, watch, setValue, formState, reset } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: validationRules && process.env.REACT_APP_ENABLE_VALIDATION === 'true' ? yupResolver(validationRules(agentType)) : null,
        defaultValues: process.env.REACT_APP_ENABLE_TESTING_VALUES && defaultVals ? defaultVals(agentType) : state.details
    });
    
    return {
        reset,
        formState,
        setValue,
        register,
        control,
        handleSubmit,
        getValues,
        errors,
        action,
        push,
        state,
        agentType,
        watch
    }
} 

export default useCustomFormHook
import React from 'react'
import * as S from "./InputFieldStyled";
import useCheckFieldValue from "../../hooks/useCheckFieldValue";

// TODO: Create API docs for field
const InputField = React.memo(({ name, label, className, style, required, register, getValues, errors, handleonblur, onChange, ...props}) => {
    const classVal = required ? `${className} required-field`: className;
    const { isEmpty, isFieldEmpty, setIsEmpty } = useCheckFieldValue(name, getValues);

    const handleOnKeyPress = e => {
        setIsEmpty(true)
        if(props.handleonkeypress){
            props.handleonkeypress(e);
        }
    }

    const handleOnBlur = e => {
        isFieldEmpty(e.target.value);
        if(handleonblur){
            props.handleonblur(e);
        }
    }

    return (
        <S.InputField style={style} isEmpty={isEmpty}>
            <input name={name} ref={register}
            onKeyPress={handleOnKeyPress}
            onBlur={handleOnBlur}
            onChange={onChange}
            {...props}
            />
            <label className={classVal}>{label}</label>
            {errors ? <span>{errors?.message}</span> : null}
        </S.InputField>
    )
})

export default InputField

import React from 'react'
import * as S from "./InputFieldStyled";

const InputField = React.memo(({ name, label, register, errors, required, className, style, message }) => {
    const classVal = required ? `${className} required-field`: className;
    const [isEmpty, setIsEmpty] = React.useState(false);
    const isFieldEmpty = (value) => {
        if(value === "" || value === undefined || value === null){
            setIsEmpty(false)
        }else{
            setIsEmpty(true)
        }
    }

    return (
        <S.InputField style={style} isEmpty={isEmpty}>
            <input name={name} ref={register({ required: required })}
            onKeyPress={event => isFieldEmpty(event.target.value)}
            onBlur={event => isFieldEmpty(event.target.value)} />
            <label className={classVal}>{label}</label>
            {errors && 
            ( errors.message !== null || errors.message !== undefined 
            ? <span>{errors.message}</span>
            : null
            )}
        </S.InputField>
    )
})

export default InputField

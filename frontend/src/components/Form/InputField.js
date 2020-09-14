import React from 'react'
import * as S from "./InputFieldStyled";

const InputField = ({ name, label, register, errors, required, className, style }) => {
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
            {required && errors && <span>Required Field</span>}
        </S.InputField>
    )
}

export default InputField

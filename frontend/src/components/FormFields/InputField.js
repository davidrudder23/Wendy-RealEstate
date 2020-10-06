import React from 'react'
import * as S from "./InputFieldStyled";
import useCheckFieldValue from "../../hooks/useCheckFieldValue";

const InputField = React.memo(({ name, label, className, style, required, register, getValues, errors, ...props}) => {
    const classVal = required ? `${className} required-field`: className;
    const { isEmpty, isFieldEmpty } = useCheckFieldValue(name, getValues);

    return (
        <S.InputField style={style} isEmpty={isEmpty}>
            <input name={name} ref={register}
            onKeyPress={event => isFieldEmpty(event.target.value)}
            onBlur={event => isFieldEmpty(event.target.value)}
            {...props}
            />
            <label className={classVal}>{label}</label>
            {errors ? <span>{errors?.message}</span> : null}
        </S.InputField>
    )
})

export default InputField

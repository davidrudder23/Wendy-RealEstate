import React from 'react'
import * as S from "./InputFieldStyled";

const InputField = React.memo(({ name, label, className, style, required, register, getValues, errors }) => {
    const classVal = required ? `${className} required-field`: className;
    const [isEmpty, setIsEmpty] = React.useState(false);
    const isFieldEmpty = (value) => {
        if(value === "" || value === undefined || value === null){
            setIsEmpty(false)
        }else{
            setIsEmpty(true)
        }
    }

    React.useEffect(() => {
        if(getValues && getValues(`${name}`)) {
            setIsEmpty(true)
        }
    }, [name, getValues]);

    return (
        <S.InputField style={style} isEmpty={isEmpty}>
            <input name={name} ref={register}
            onKeyPress={event => isFieldEmpty(event.target.value)}
            onBlur={event => isFieldEmpty(event.target.value)}
            />
            <label className={classVal}>{label}</label>
            {errors ? <span>{errors?.message}</span> : null}
        </S.InputField>
    )
})

export default InputField

import React from 'react'
import * as S from "./InputFieldStyled";
import useCheckFieldValue from "../../hooks/useCheckFieldValue";

const InputField = React.memo(({ name, label, className, style, required, register, getValues, errors, value, onKeyDown, ...props }) => {
    const classVal = required ? `${className} required-field` : className;
    const { isEmpty, isFieldEmpty, setIsEmpty } = useCheckFieldValue(name, getValues);
    const [text, setText] = React.useState(
        value ? value : ""
    );

    React.useEffect(() => {
        if (value) {
            setText(value)
        }
    }, [value])

    const handleOnKeyPress = e => {
        setIsEmpty(true)
        if (props.handleonkeypress) {
            props.handleonkeypress(e);
        }
    }

    const handleOnBlur = e => {
        isFieldEmpty(e.target.value);
        if (props.handleonblur) {
            props.handleonblur(e);
        }
    }

    const handleOnChange = e => {
        if (!value) {
            setText(e.target.value)
        }
        setIsEmpty(true);
        if (props.onChange) {
            props.onChange(e)
        }
    }

    return (
        <S.InputField style={style} isEmpty={isEmpty || value}>
            <input
                value={text}
                name={name}
                ref={register}
                onKeyPress={handleOnKeyPress}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                onKeyDown={onKeyDown}
                {...props}
            />
            <label className={classVal}>{label}</label>
            {errors ? <span>{errors?.message}</span> : null}
        </S.InputField>
    )
})

export default InputField

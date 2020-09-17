import React from 'react'
import * as S from "./DropDownListStyled"

const DropDownList = React.memo(({ placeholder, options, register, setValue, isValue, ...rest }) => {
    
    const handleChange = (event) => {
        event.preventDefault();
        setValue(event.target.value);
    }

    return (
        <S.Select defaultValue={isValue} onChange={handleChange} ref={register} {...rest}>
            <option value="" disabled hidden>{placeholder}</option>
            {options.map(value => (
                <option key={value} value={value}>
                    {value}
                </option>
            ))}
        </S.Select>
    )
})

export default DropDownList

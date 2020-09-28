import React from 'react';
import * as S from "./RadioSelectorStyled";

const RadioSelector = React.memo(({ register, required, name, array }) => {

    const selectedVal = React.createRef();

    // To create a radio group you must used uncontrolled components.
    // Documentation: https://reactjs.org/docs/uncontrolled-components.html

    return (
        <S.Container>
            {array.map((value) => (
                <div key={`input-${value}`}>
                    <input name={name} type="radio" value={value} defaultChecked={selectedVal === "test2"} ref={register({ required: required })} />
                    <label>
                        {value}
                    </label>
                </div>
            ))}
        </S.Container>
    )
})

export default RadioSelector

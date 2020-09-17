import React from 'react'
import * as S from "./SliderStyled";

const Slider = React.memo(({ isChecked, setIsChecked, name, required, register }) => {

    console.log("re-rendered: " + name)

    return (
        <S.Label>
            <S.Input value={isChecked} type="checkbox" name={name} ref={register({ required: required })} />
            <S.Span checked={isChecked} onClick={() => setIsChecked(isChecked => !isChecked)} />
        </S.Label>
    )
})

export default Slider

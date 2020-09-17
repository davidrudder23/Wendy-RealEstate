import React from 'react'
import * as S from "./SliderStyled";

const Slider = React.memo(({ isChecked, setIsChecked, name, required, register }) => {

    console.log("re-rendered: " + name)

    return (
        <S.Container>
            <S.Label>
                <S.Input value={isChecked} type="checkbox" name={name} ref={register({ required: required })} />
                <S.Span checked={isChecked} onClick={() => setIsChecked(isChecked => !isChecked)} />
            </S.Label>
        </S.Container>
    )
})

export default Slider

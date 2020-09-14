import React from 'react'
import * as S from "./SliderStyled";

const Slider = ({ isChecked, setIsChecked }) => {
    return (
        <S.Label>
            <S.Input />
            <S.Span checked={isChecked} onClick={() => setIsChecked(!isChecked)}/>
        </S.Label>
    )
}

export default Slider

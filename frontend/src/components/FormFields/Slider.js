import React from 'react'
import * as S from "./SliderStyled";
import { FieldTitle } from "./FormStyled";

const Slider = React.memo(({ isChecked, setIsChecked, name, register, title }) => {

    const handleOnClick = () => {
        setIsChecked(isChecked => !isChecked)
    }

    return (
        <FieldTitle
            onClick={handleOnClick}
            style={{ cursor: 'pointer' }}
        >
            {title}
            <S.Container>
                <S.Label>
                    <S.Input value={isChecked} type="checkbox" name={name} ref={register} />
                    <S.Span checked={isChecked} onClick={handleOnClick} />
                </S.Label>
            </S.Container>
        </FieldTitle>
    )
})

export default Slider

import React from 'react';
import * as S from "./FormHeaderStyled";

const FormHeader = ({pageHeader}) => {
    return (
        <S.FieldWrapper>
            <S.Title>Massachusetts Real Estate Transaction Form </S.Title>
            <S.message>Please ensure that all information is filled out correctly as this information will be utilized throughout the transaction process.</S.message>
            <S.PageTitle>{pageHeader}</S.PageTitle>
        </S.FieldWrapper>
    )
}

export default FormHeader

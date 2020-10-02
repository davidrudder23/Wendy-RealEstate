import React from 'react';
import * as S from "./FormStyled";
import { useHistory } from "react-router-dom";

export const Back = () => {
    const { goBack } = useHistory();
    return ( <S.Input type="button" value="Back" onClick={() => goBack()} /> )
}

export const Next = () => {
    return (
        <S.Input type="submit" value="Next" />
    )
}


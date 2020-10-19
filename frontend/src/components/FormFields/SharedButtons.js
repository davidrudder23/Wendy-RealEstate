import React from 'react';
import * as S from "./FormStyled";
import { useHistory } from "react-router-dom";

// TODO: Update button to save state on back
export const Back = () => {
    const history = useHistory();
    return (<S.Input type="button" value="Back" onClick={() => history.goBack()} />)
}

export const Next = () => {
    return (
        <S.Input type="submit" value="Next" />
    )
}


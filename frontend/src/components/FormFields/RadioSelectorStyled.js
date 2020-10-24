import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
`;

export const optionWrapper = styled.div`
    margin: .5rem;
`;

export const InputRadio = styled.input`
    width: 1rem;
    height: 1rem;
    cursor: pointer;
`;

export const Label = styled.label`
    margin: .25em;
    font-weight: 450;
    padding-left: .25rem;
    cursor: pointer;
`;

export const OtherWrapper = styled.div`
    display: inline-block;
    margin: .5rem;
    position: relative;
    top: -1.125rem;
`;
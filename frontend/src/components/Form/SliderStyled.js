import styled from "styled-components";

export const Label = styled.label`
    position: relative;
    display: inline-block;
    width: 2.125rem;
    height: 1.25rem;
`;

export const Input = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`;

export const Span = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${ props => props.checked ? "#03ac13" : "red"};
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 30px;

    ::before {
        position: absolute;
        content: "";
        border-radius: 50%;
        height: .8125rem;
        width: .8125rem;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
        -webkit-transform: ${props => props.checked ? "translateX(13px)" : null };
        -ms-transform: ${props => props.checked ? "translateX(13px)" : null };
        transform: ${props => props.checked ? "translateX(13px)" : null };
    }
`;
import styled from "styled-components";

export const Label = styled.label`
    position: relative;
    display: inline-block;
    width: 2.625rem;
    height: 1.25rem;
    margin-left: .25rem;
    line-height: 1.5rem;
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
    background-color: ${ props => props.checked ? "#16abf0" : "#c9c9c9"};
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
        -webkit-transform: ${props => props.checked ? "translateX(21px)" : null };
        -ms-transform: ${props => props.checked ? "translateX(21px)" : null };
        transform: ${props => props.checked ? "translateX(21px)" : null };
    }

    ::after {
        /* content: "" + ; */
        content: '${props => props.checked ? "YES" : "NO"}';
        color: ${ props => props.checked ? "#ccc" : "#16abf0"};
        display: block;
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: ${props => props.checked ? "30%" : "70%"};
        font-size: 10px;
        font-family: Arial, Helvetica, sans-serif;
    }
`;
import styled from "styled-components";

export const Select = styled.select`
    font-family: Helvetica, Arial, sans-serif;
    font-size: 12pt;
    width: 12.4375rem;
    border: none;
    border-bottom: 1px solid #ccc;
    margin: 1rem 0 0 0;
    padding: 0;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    
    span {
        position: relative;
        color: red;
        /* line-height: 10em; */
        font-size: 8pt;
        right: 0;
    }
`;
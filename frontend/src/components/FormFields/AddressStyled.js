import styled from "styled-components";

export const DropDownItem = styled.div`
    padding-bottom: .25rem;
    position: relative;
    border-bottom: solid 1px #ccc;
    :last-child {
        border-bottom: none;
    }
    font-size: 15px;
    cursor: pointer;
`;

export const DropDownWrapper = styled.div`
    position: absolute;
    top: 32;
    padding: .25rem;
    z-index: 1000;
    background-color: #fff;
    /* border: 1px solid #bbbbbb; */
    box-shadow: 0 2px 6px rgba(0,0,0, 0.2);
`;

export const DropDownContainer = styled.div`
    position: relative;
    vertical-align: top;
    top: -32px;
`;
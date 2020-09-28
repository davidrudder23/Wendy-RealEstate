import styled from "styled-components";

export const Title = styled.div`
    margin: 0 0 .125rem 0;
    padding: 0px;
    text-align: center;
    font-weight: bold;
    font-size: 16pt;

    @media only screen and (max-device-width : 640px) {
        font-size: 12pt;
    }

    @media only screen and (max-device-width: 560px){
        font-size: 10pt;
    }
`;

export const message = styled.p`
    margin: 0;
    padding: 0;
    /* text-align: left; */

    @media only screen and (max-device-width : 640px) {
        font-size: 12pt;
    }

    @media only screen and (max-device-width: 560px){
        font-size: 10pt;
    }
`;

export const FieldWrapper = styled.div`
    padding: 1rem;
    background-color: #fff;
    margin-bottom: .75rem;
    border-radius: .75rem;
    border: 1px solid #d3d3d3;
    min-height: 7.125rem;
    box-sizing: border-box;
    text-align: center;
`;
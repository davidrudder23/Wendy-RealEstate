import styled from "styled-components";

export const Container = styled.div`
    background-color: #e7ecee;
    padding-top: .5rem;
    min-height: 99vh;
    height: 100%;

    form {
        width: 40rem;
        margin: 0 auto;
        background: transparent;

        @media only screen and (max-device-width : 640px) {
            width: 95%;
        }

    }
`;

export const FieldTitle = styled.div`
    font-family: Helvetica, Arial, sans-serif; 
    position: relative;
    margin-bottom: .5rem;
    font-weight: bold;
`;

export const FieldWrapper = styled.div`
    position: relative;
    background-color: #fff;
    margin-bottom: .75rem;
    padding: 1.5rem;
    border-radius: .75rem;
    border: ${props => props.error ? "1px solid #d93025" : "1px solid #d3d3d3" };
    min-height: 7.125rem;
    box-sizing: border-box;
`;

export const Button = styled.div`
    display: inline-block;
    position: relative;
    font-size: 12pt;
    font-weight: 500;
    font-family: Helvetica, Arial, sans-serif;
    background: #fff;
    padding: .75rem;
    border: 1px solid #d3d3d3;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    margin-bottom: .5rem;
    border-radius: .5rem;
`;

export const Input = styled.input`
    display: inline-block;
    position: relative;
    font-size: 12pt;
    font-weight: 500;
    font-family: Helvetica, Arial, sans-serif;
    background: #fff;
    padding: .75rem;
    border: 1px solid #d3d3d3;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    margin-bottom: .5rem;
    border-radius: .5rem;
    margin-right: .5rem;
`;

export const MultiContainer = styled.div`
    display: flex;
    flex-direction: row;
    
    @media only screen and (max-device-width : 425px) {
        flex-direction: column;
    }
    
`;

// Should only be used when inside MultiContainer
export const AddressWrapper = styled.div`
    padding-left: 1rem;
    @media only screen and (max-device-width : 425px) {
        padding-left: 0;
    }
`;
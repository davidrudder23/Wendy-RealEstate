import styled from "styled-components";

export const Main = styled.div`
display: flex;
justify-content: center;
padding-top: 1rem;
border: 1px solid #d3d3d3;
background-color: white;
border-radius: .5rem;
padding-bottom: 1rem;
margin-bottom: .5rem;
padding-left: .25rem;
padding-right: .25rem;
`;

export const Primary = styled.div`
    background-color: white;
`;

export const Box = styled.div`
    border-top: ${ props => props.notTop ? "none" : ".5px solid #000" };
    border-right: .5px solid #000;
    border-bottom: .5px solid #000;
    flex-grow: 1;
    :first-child {
        border-left: .5px solid #000;
    }
`;

export const Row = styled.div`
    display: flex;
    direction: row;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: .25rem;
`;

export const Title = styled.div`
    font-weight: bold;
    font-style: italic;
    text-align: center;
`;

export const LargeBox = styled(Box)`
    flex-grow: 2;
    
    :first-child {
        border-left: .5px solid #000;
    }
`;
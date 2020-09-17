import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1em;

    div {
        margin: .5rem;
    }

    input {
        width: 1rem;
        height: 1rem;
    }

    label {
        margin: .25em;
        font-weight: 450;
        padding-left: .25rem;
    }
`;
import styled from 'styled-components';

export const btn = styled.div`
    font-weight: 500;
    height: 1.5rem;
    width: 1.5rem;
    display: inline-block;
    background-color: #fff;
    border: 1px solid #c9c9c9;
    border-radius: 20%;
    text-align: center;
    font-size: 1.5rem;
    line-height: 1rem;
    cursor: pointer;
`;

export const PlusBtn = styled(btn)`
    ::before {
        content: "+";
    }
`;

export const MinusBtn = styled(btn)`
    ::before {
        content: "-";
    }
`;
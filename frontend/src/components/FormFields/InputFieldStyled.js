import styled from "styled-components";

const highlightColor = "#16abf0";
const paddingHorizontal = "8px";

export const InputField = styled.div`
    position: relative;
    margin-bottom: 1rem;
    padding-bottom: 1rem;

    /* This is so there can be multiple fields side by side 
        Start-block
    */
    padding-left: 1rem;

    @media only screen and (max-device-width : 425px) {
        padding-left: 0;
    }

    :last-child label {
        padding-left: 1rem;
        
        @media only screen and (max-device-width : 425px) {
            padding-left: 0;
        }
    }

    :first-child {
        padding-left: 0;
        label {
            padding-left: 0;
        }

        @media only screen and (max-device-width : 425px) {
            padding-left: 0;
        }
    }
    /* end-block */

    input {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 12pt;
        width: 15.4375rem;
        margin: 0;
        padding: 0;
        height: 2.6em;
        line-height: 2.6em;
        margin-top: .5em;
        border: none;
        outline: none;
        position: relative;
        top: 0;
        left: 0;
        display: block;
        background: transparent;
        z-index: 2;
        border-bottom: 1px solid #ccc;
        text-indent: ${paddingHorizontal};
    }

    input:focus+label {
        color: ${highlightColor}
    }

    label {
        display: block;
        position: absolute;
        top: 0;
        left: ${ props => props.isEmpty ? "0px" : paddingHorizontal};
        font-size: 12pt;
        z-index: 1;
        transform-origin: 0, 0.0em;
        transition: transform 500ms, color 300ms;
        transform: ${props => props.isEmpty ? 'scale(0.85, 0.85) rotateY(0)' :  'scale(1,1) rotateY(0)'};
        line-height: ${props => props.isEmpty ? '.25em' : '3em'};
        color: #696969;
    }

    span {
        position: relative;
        color: red;
        /* line-height: 10em; */
        font-size: 8pt;
        right: 0;
    }

    .react-datepicker-popper {
        z-index: 4;
    }

    ::has(> input[type="hidden"]) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important;
    }

    /* input[type="hidden"]:(> div.active) {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important;
    } */

`;


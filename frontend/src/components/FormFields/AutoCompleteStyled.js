import styled from "styled-components";
// TODO update styles

export const AutoCompleteWrapper = styled.div`
    margin-bottom: 1rem;
    padding-bottom: 1rem;

    && > div {
        margin-bottom: 0;
        padding-bottom: 0;
    }

  .no-suggestions {
    color: #999;
    padding: 0.5rem;
  }
  
  .suggestions {
    position: absolute;
    border: 1px solid #999;
    border-top-width: 0;
    list-style: none;
    margin-top: 0;
    max-height: 143px;
    overflow-y: auto;
    padding-left: 0;
    width: calc(300px + 1rem);
    z-index: 1000;
    background-color: #FFF;
    font-size: 12px;
  }
  
  .suggestions li {
    padding: 0.5rem;
  }
  
  .suggestion-active,
  .suggestions li:hover {
    background-color: #16abf0;
    color: #FFF;
    cursor: pointer;
    font-weight: 700;
  }
  
  .suggestions li:not(:last-of-type) {
    border-bottom: 1px solid #999;
  }
`
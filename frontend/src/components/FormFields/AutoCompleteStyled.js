import styled from "styled-components";
// TODO update styles

export const AutoCompleteWrapper = styled.div`
    && > div {
        margin-bottom: 0;
        padding-bottom: 0;
    }

  .no-suggestions {
    color: #999;
    padding: 0.5rem;
  }
  
  .suggestions {
    border: 1px solid #999;
    border-top-width: 0;
    list-style: none;
    margin-top: 0;
    max-height: 143px;
    overflow-y: auto;
    padding-left: 0;
    width: 15.4375rem;
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
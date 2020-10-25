import React from 'react'
import InputField from './InputField';
import * as S from "./AutoCompleteStyled";
import useOnclickOutside from "react-cool-onclickoutside";

// TODO: Add auto scrolling to keep active item into focus
const AutoComplete = ({

  /** A list of items to sort and display as suggestions */
  suggestions = [],

  /** Can be a custom filter function that with params (suggestions) and returns (filteredSuggestions) */
  howToFilter,

  /** pass a function that uses onBlur and gets the params (event) */
  handleonblur,

  /** pass a function that uses OnKeyPress and gets the params (event) */
  handleonkeypress,

  /** Can be used when you want to disable the field during loading or other reasons */
  status,

  /** Allows for onChange effect with params of (event) */
  onChange,
  
  /** Can pass a function that is triggered on selection of an item in the list of suggestions. The possible params are (event , tuple) */
  onSelect,
  /** If you do not wish to pass a sorting method you can use the default one provided in onChange */
  useDefaultFilter = true,
  value,
  getValues,
  name,
  ...props }) => {
    const ref = useOnclickOutside(() => {
      handleOnBlur();
    });
    
    const [suggestionState, setSuggestionState] = React.useState({
        // The active suggestion's index
        activeSuggestion: 0,
        // The suggestions that match the user's input
        filteredSuggestions: [],
        // Whether or no the suggestion list is shown
        showSuggestions: false,
        // What the user has entered
        userInput: value ? value : "",
    });
    
    React.useEffect(() => {
      setSuggestionState(state => {
        return {
          ...state,
          userInput: value
        }
      })
    }, [value])

    // This is required because AutoComplete is using InputField as a controlled component
    React.useEffect(() => {
      if(getValues && getValues(`${name}`)){
        setSuggestionState({userInput: getValues(`${name}`)})
      }
    }, [name, getValues])
    
    const handleOnBlur = (e) => {
      if(handleonblur){
        handleonblur(e);
      }
      setSuggestionState(state => {
        return {
        ...state,
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
      }});
    }
    
    
    const handleOnChange = e => {
      e.stopPropagation();
      const userInput = e.target.value;
      
      if(onChange){
        onChange(e);
      }
      e.persist();

      // Filter our suggestions that don't contain the user's input
      let filteredSuggestions;     
      if(howToFilter){
        filteredSuggestions = howToFilter(suggestions);        
      } else {
        filteredSuggestions = suggestions;
      }
      
      console.log(suggestions)
      if(useDefaultFilter && !howToFilter){
        filteredSuggestions = suggestions.filter(suggestion => {
          if(suggestion !== null){
            return suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
          }
          return false;
        });
      }
      
      setSuggestionState({
        activeSuggestion: 0,
        filteredSuggestions,
        showSuggestions: true,
        userInput: userInput,
      });
      };

    const handleSelect = (e) => {
      e.stopPropagation();
      let text = e.currentTarget.innerText;
      
      setSuggestionState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: text,
      });

      if(onSelect){
        onSelect(e, suggestions.indexOf(text));
      }
    };

    const handleOnKeyDown = e => {
      const { activeSuggestion, filteredSuggestions } = suggestionState;

      // User pressed the enter key
      if (e.keyCode === 13) {
        e.preventDefault();
        e.stopPropagation();
        setSuggestionState(state => { 
          return {
            ...state,
            activeSuggestion: 0,
            showSuggestions: false,
            userInput: filteredSuggestions[activeSuggestion]
          }
        });

        if(onSelect){
          onSelect(e, suggestions.indexOf(filteredSuggestions[activeSuggestion]))
        }
      }
      
      // User pressed the up arrow
      else if (e.keyCode === 38) {
        if (activeSuggestion === 0) {
          return;
        }
        setSuggestionState(state => {
          return { ...state, activeSuggestion: activeSuggestion - 1} 
        });
      }
      

      // User pressed the down arrow
      else if (e.keyCode === 40) {
      
        if (activeSuggestion - 1 === filteredSuggestions.length) {
          return;
        }
      
        
        setSuggestionState(state => {
          return { ...state, activeSuggestion: activeSuggestion + 1} 
        });
      };
      e.stopPropagation();
    };

    const handleOnFocus = () => {
      setSuggestionState(state => {
        return {
        ...state,
        activeSuggestion: 0,
        filteredSuggestions: suggestions,
        showSuggestions: true,
      }});
    }

    const noSuggestions = () => {
      return (
        <div className="no-suggestions">
          <em>No suggestions</em>
        </div>
      );
    }

    const suggestionsListComponent = () => {
      const { showSuggestions, filteredSuggestions, activeSuggestion } = suggestionState;

      if (showSuggestions) {
        if (filteredSuggestions.length) {
          if(!filteredSuggestions.some(suggestion => suggestion !== null)){
            return noSuggestions();
          }
          return (
            <ul className="suggestions">
                  {filteredSuggestions.map((suggestion, index) => {
                    if(suggestion) {
                    let className;

                    if (index === activeSuggestion) {
                      className = "suggestion-active";
                    }
      
                    return (
                      <li className={className} key={`${suggestion}.${index}`} onClick={handleSelect}>
                        {suggestion}
                      </li>
                    );
                  }else{
                    return null
                  };
                  })}
                </ul>
              );
          } else {
            noSuggestions();
          }
        }    
    }
    

    return (
        <S.AutoCompleteWrapper ref={ref}>
          <InputField
            value={suggestionState.userInput}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            onFocus={handleOnFocus}
            getValues={getValues}
            name={name}
            {...props}
          />
          {suggestionsListComponent()}
      </S.AutoCompleteWrapper>
    )
}

export default AutoComplete

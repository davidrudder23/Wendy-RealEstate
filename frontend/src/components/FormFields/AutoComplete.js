import React from 'react'
import InputField from './InputField';
import * as S from "./AutoCompleteStyled";
import useOnclickOutside from "react-cool-onclickoutside";
// TODO: Add auto scrolling to keep active item into focus

const AutoComplete = React.memo(({ 
  suggestions = [], 
  howToFilter,
  handleonblur,
  handleonkeypress, 
  filterValues = true, 
  status = true, 
  onChange, 
  onSelect,
  getValues,
  name,
  errors,
  register,
  required,
  label,
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
        userInput: '',
    });

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
      const userInput = e.currentTarget.value;
      
      // Filter our suggestions that don't contain the user's input
      let filteredSuggestions;
      if(filterValues){
        if(howToFilter){
          filteredSuggestions = howToFilter(suggestions);
        }else {
          filteredSuggestions = suggestions.filter(
            suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
            );
          }
        }else {
          filteredSuggestions = suggestions;
        }
        
        setSuggestionState({
          activeSuggestion: 0,
          filteredSuggestions,
          showSuggestions: true,
          userInput: userInput,
        });
        
        if(onChange){
          onChange(e);
        }
      };

    const handleSelect = e => {
      
      e.stopPropagation();
      setSuggestionState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: e.currentTarget.innerText,
      });

      if(onSelect){
        onSelect(e)
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
      setSuggestionState({
        activeSuggestion: 0,
        filteredSuggestions: suggestions,
        showSuggestions: true,
        userInput: "",
      });
    }

    const suggestionsListComponent = () => {
      const { showSuggestions, filteredSuggestions, activeSuggestion } = suggestionState; 

      if (showSuggestions) {
        if (filteredSuggestions.length) {


          return (
            <ul className="suggestions">
                  {filteredSuggestions.map((suggestion, index) => {
                    let className;

                    if (index === activeSuggestion) {
                      className = "suggestion-active";
                    }
      
                    return (
                      <li className={className} key={suggestion} onClick={handleSelect}>
                        {suggestion}
                      </li>
                    );
                  })}
                </ul>
              );
            } else {
              return (
                <div className="no-suggestions">
                  <em>No suggestions</em>
                </div>
              );
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
            errors={errors}
            register={register}
            required={required}
            label={label}
            {...props}
          />
          {suggestionsListComponent()}
      </S.AutoCompleteWrapper>
    )
})

export default AutoComplete

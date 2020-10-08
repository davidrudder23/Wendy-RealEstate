import React from 'react'
import InputField from './InputField';


/*
  TODO: Create api docs for field
  handleonblur = onBlur
  handleonkeypress = onKeyPress

*/
const AutoComplete = ({ suggestions, howToFilter, handleonblur, handleonkeypress, ...props }) => {
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

    const handleOnChange = e => {
        const userInput = e.currentTarget.value;
        
        // Filter our suggestions that don't contain the user's input
        let filteredSuggestions;
        if(howToFilter){
          filteredSuggestions = howToFilter();
        }else{
          filteredSuggestions = suggestions.filter(
              suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
          );
        }

        setSuggestionState({
            activeSuggestion: 0,
            filteredSuggestions: filteredSuggestions,
            showSuggestions: true,
            userInput: userInput,
        });
    };

    const handleOnClick = e => {
        setSuggestionState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText,
        });
    };

    const handleOnKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = suggestionState;
    
        // User pressed the enter key
        if (e.keyCode === 13) {
          setSuggestionState({
            activeSuggestion: 0,
            showSuggestions: false,
            userInput: filteredSuggestions[activeSuggestion]
          });
        }
    
        // User pressed the up arrow
        else if (e.keyCode === 38) {
          if (activeSuggestion === 0) {
            return;
          }
    
          setSuggestionState({ activeSuggestion: activeSuggestion - 1 });
        }
    
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
  
        setSuggestionState({ activeSuggestion: activeSuggestion + 1 });
      };
    };

    const suggestionsListComponent = () => {
        if (suggestionState.showSuggestions && suggestionState.userInput) {
            if (suggestionState.filteredSuggestions.length) {
              return (
                <ul className="suggestions">
                  {suggestionState.filteredSuggestions.map((suggestion, index) => {
                    let className;
      
                    // Flag the active suggestion with a class
                    if (index === suggestionState.activeSuggestion) {
                      className = "suggestion-active";
                    }
      
                    return (
                      <li className={className} key={suggestion} onClick={handleOnClick}>
                        {suggestion}
                      </li>
                    );
                  })}
                </ul>
              );
            } else {
              return (
                <div className="no-suggestions">
                  <em>No suggestions, you're on your own!</em>
                </div>
              );
            }
        }    
    }
    

    return (
        <React.Fragment>
        <InputField
          onChange={props?.onChange || handleOnChange}
          onKeyDown={props?.onKeyDown || handleOnKeyDown}
          handleonblur={handleonblur}
          {...props}
        />
        {suggestionsListComponent()}
      </React.Fragment>
    )
}

export default AutoComplete

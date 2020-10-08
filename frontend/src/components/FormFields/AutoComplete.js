import React from 'react'
import InputField from './InputField';


/*
  TODO: Create api docs
  handleonblur = onBlur
  handleonkeypress = onKeyPress
  onSelect = handleSelect for list of rendered items
  filterValues = allows you to turn off filtering the list
  status = is if the component is ready to render the list
  howToFilter = custom filter for the list
  suggestions = an array of strings to render and search
  onChange = onChange
*/
const AutoComplete = ({ suggestions, howToFilter, handleonblur, handleonkeypress, status = true, onChange, filterValues = true, onSelect, ...props }) => {
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
      e.stopPropagation();
      const userInput = e.target.value;
      
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
      if(onSelect){
        onSelect(e)
      }
      setSuggestionState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: e.currentTarget.innerText,
      });
    };


    //TODO: This is currently bugged and does not work as intended.
    /* 
      Type -> use down arrow
      should recreate bug

      // Error Message: A component is changing a controlled input of type undefined to be uncontrolled. Input elements should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component.
    */
    // const handleOnKeyDown = e => {
    //   const { activeSuggestion, filteredSuggestions } = suggestionState;
    //   console.log(activeSuggestion)

    //   // User pressed the enter key
    //   if (e.keyCode === 13) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setSuggestionState({
    //       activeSuggestion: 0,
    //       showSuggestions: false,
    //       userInput: filteredSuggestions[activeSuggestion]
    //     });
    //   }
      
    //   // User pressed the up arrow
    //   else if (e.keyCode === 38) {
    //     if (activeSuggestion === 0) {
    //       return;
    //     }
        
    //     setSuggestionState({ activeSuggestion: activeSuggestion - 1 });
    //   }
      
    //   // User pressed the down arrow
    //   else if (e.keyCode === 40) {
    //     if (activeSuggestion - 1 === filteredSuggestions.length) {
    //       return;
    //     }
        
    //     setSuggestionState({ activeSuggestion: activeSuggestion + 1 });
    //   };
    //   e.stopPropagation();
    // };
    
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
        <div>
        <InputField
          value={suggestionState.userInput}
          onChange={handleOnChange}
          // onKeyDown={handleOnKeyDown}
          handleonblur={handleonblur}
          {...props}
        />
        {suggestionsListComponent()}
      </div>
    )
}

export default AutoComplete

import React from 'react'
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import InputField from "../FormFields/InputField";
import * as S from "./AddressStyled";

// TODO: enable direction arrow to selected drop down item
// TODO: InputField doesnt register first key press?
const Address = ({ label, name, register, required, getValues, errors }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete();

      const ref = useOnclickOutside(() => {
        clearSuggestions();
      });



    // const handleOnKeyDown = e => {
      
    //       // User pressed the enter key
    //       if (e.keyCode === 13) {
    //         this.setState({
    //           activeSuggestion: 0,
    //           showSuggestions: false,
    //           userInput: filteredSuggestions[activeSuggestion]
    //         });
    //       }
      
    //       // User pressed the up arrow
    //       else if (e.keyCode === 38) {
    //         if (activeSuggestion === 0) {
    //           return;
    //         }
      
    //         this.setState({ activeSuggestion: activeSuggestion - 1 });
    //       }
      
    //       // User pressed the down arrow
    //       else if (e.keyCode === 40) {
    //           if (activeSuggestion - 1 === filteredSuggestions.length) {
    //               return;
    //           }
    
    //       setSuggestionState({ activeSuggestion: activeSuggestion + 1 });
    //     };
    //   };
     
      const handleInput = (e) => {
        setValue(e.target.value);
      };
     
      const handleSelect = ({ description }) => () => {
        setValue(description, false);
        clearSuggestions();
      };
     
      const renderSuggestions = () => {
        return <S.DropDownContainer>
                 <S.DropDownWrapper>
                {data.map((suggestion) => {
                  const {
                    place_id,
                    structured_formatting: { main_text, secondary_text },
                  } = suggestion;
                
                  return (
                    <S.DropDownItem key={place_id} onClick={handleSelect(suggestion)}>
                      <strong>{main_text}</strong> <small>{secondary_text}</small>
                    </S.DropDownItem>
                  );
                })}
            </S.DropDownWrapper>
        </S.DropDownContainer>
      }
     
      return (
        <div ref={ref}>
          <InputField
            value={value}
            onChange={handleInput}
            // onKeyDown={handleOnKeyDown}
            disabled={!ready}
            label={label}
            name={name}
            register={register}
            required={required}
            getValues={getValues}
            errors={errors}
          />
          {/* We can use the "status" to decide whether we should display the dropdown or not */}
          {status === "OK" && renderSuggestions()}
        </div>
      );
}

export default Address

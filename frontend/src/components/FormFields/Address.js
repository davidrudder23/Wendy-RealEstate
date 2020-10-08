import React from 'react'
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import InputField from "../FormFields/InputField";
import * as S from "./AddressStyled";

// TODO: Migrate component to AutoComplete Component
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

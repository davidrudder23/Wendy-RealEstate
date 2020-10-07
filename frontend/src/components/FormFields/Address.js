import React from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import InputField from "../FormFields/InputField";
import * as S from "./AddressStyled";

// TODO: enable direction arrow to selected drop down item
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
     
        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
          .then((results) => getLatLng(results[0]))
          .then(({ lat, lng }) => {
            console.log("📍 Coordinates: ", { lat, lng });
          })
          .catch((error) => {
            console.log("😱 Error: ", error);
          });
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
        <div ref={ref} style={{display: "block"}}>
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

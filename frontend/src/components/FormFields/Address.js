import React from 'react'
import usePlacesAutocomplete from "use-places-autocomplete";
import AutoComplete from './AutoComplete';

/* 
  Uses google places api to lookup address and utilizes AutoComplete
  to generate dropdown list of choices to select from.
*/

const Address = ({ disable=false, value, ...props }) => {
    const {
        ready,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete();
   
      const handleInput = (e) => {
        setValue(e.target.value);
        if(value){
          setValue(value);
          return;
        }
      };
     
      const handleSelect = (e) => () => {
        setValue(e.currentTarget.innerText, false);
        clearSuggestions();
      };

      const handleOnBlur = () => {
        clearSuggestions();
      }

      const getDescriptions = data.map(({description}) => description);

      return (
          <AutoComplete
            onSelect={handleSelect}
            onChange={handleInput}
            disabled={disable || !ready}
            handleonblur={handleOnBlur}
            suggestions={getDescriptions}
            status={status}
            filterValues={false}
            {...props}
          />
      );
}

export default Address

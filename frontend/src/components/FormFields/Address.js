import React from 'react'
import usePlacesAutocomplete from "use-places-autocomplete";
import AutoComplete from './AutoComplete';

/* 
  Uses google places api to lookup address and utilizes AutoComplete
  to generate dropdown list of choices to select from.
*/

const Address = ({ disable=false, text, name, ...props }) => {
    const {
        ready,
        suggestions: { status, data },
        value,
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete();

      React.useEffect(() => {
        if(text){
          setValue(text);
        }
      }, [text, setValue]);

      const handleInput = (e) => {
        setValue(e.target.value);
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
            value={value}
            onSelect={handleSelect}
            onChange={handleInput}
            disabled={disable || !ready}
            handleonblur={handleOnBlur}
            suggestions={getDescriptions}
            status={status}
            name={name}
            {...props}
          />
      );
}

export default Address

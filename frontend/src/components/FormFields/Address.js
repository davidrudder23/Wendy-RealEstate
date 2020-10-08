import React from 'react'
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import AutoComplete from './AutoComplete';

// TODO: Create API Docs
const Address = ({ label, name, register, required, getValues, errors, disable=false, value, ...props }) => {
    const {
        ready,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete();

      const ref = useOnclickOutside(() => {
        clearSuggestions();
      });
     
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

      const getDescriptions = data.map(({description}) => description);

      return (
        <div ref={ref}>
          <AutoComplete
            onSelect={handleSelect}
            onChange={handleInput}
            disabled={disable || !ready}
            label={label}
            name={name}
            register={register}
            required={required}
            getValues={getValues}
            errors={errors}
            suggestions={getDescriptions}
            status={status}
            filterValues={false}
            {...props}
          />
        </div>
      );
}

export default Address

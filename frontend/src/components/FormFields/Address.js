import React from 'react'
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import AutoComplete from './AutoComplete';

const Address = ({ label, name, register, required, getValues, errors }) => {
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
            disabled={!ready}
            label={label}
            name={name}
            register={register}
            required={required}
            getValues={getValues}
            errors={errors}
            suggestions={getDescriptions}
            status={status}
            filterValues={false}
          />
        </div>
      );
}

export default Address

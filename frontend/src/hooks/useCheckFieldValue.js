import React from "react";

const useCheckFieldValue = (name, getValues) => {
    
    const [isEmpty, setIsEmpty] = React.useState(false);

    // TODO: updater function is supposed to force a re-render to the newest values but doesn't
    const isFieldEmpty = (value) => {
        if(value === "" || value === undefined || value === null){
            setIsEmpty(false);
        }else{
            setIsEmpty(true);
        }
    }

    React.useEffect(() => {
        if(getValues && getValues(`${name}`)) {
            setIsEmpty(true);
        }
    }, [name, getValues]);

    return {
        isFieldEmpty,
        setIsEmpty,
        isEmpty
    }
}

export default useCheckFieldValue
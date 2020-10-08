import React from "react";

const useCheckFieldValue = (name, getValues) => {
    
    const [isEmpty, setIsEmpty] = React.useState(false);
    
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
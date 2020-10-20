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
        let componentIsMounted = true;
        
        if(componentIsMounted && getValues && getValues(`${name}`)) {
            setIsEmpty(true);
        }

        return () => (componentIsMounted = false);
    }, [name, getValues]);

    return {
        isFieldEmpty,
        setIsEmpty,
        isEmpty
    }
}

export default useCheckFieldValue
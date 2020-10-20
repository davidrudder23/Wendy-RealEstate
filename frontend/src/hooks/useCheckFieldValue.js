import React from "react";

const useCheckFieldValue = (name, getValues) => {
    
    const [text, setText] = React.useState("");
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
            setText(state => getValues(`${name}`));
        }

        return () => (componentIsMounted = false);
    }, [name, getValues]);

    return {
        text,
        isFieldEmpty,
        setIsEmpty,
        isEmpty
    }
}

export default useCheckFieldValue
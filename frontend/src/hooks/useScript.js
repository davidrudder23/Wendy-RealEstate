import React from "react";

const useScript = url => {
  React.useEffect(() => {
 
      script.src = url;
      script.defer = true;
      script.async = true;

      document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
    }, [url]);

    return {
    }
};

export default useScript
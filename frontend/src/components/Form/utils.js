import React from "react";

export const fieldRequired = ( error ) => {
    return error && <span>This field is required </span>
}

export default {
    fieldRequired
}
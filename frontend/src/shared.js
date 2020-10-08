export const deploy = process.env.REACT_APP_DEPLOY_TO_GITHUB_PAGES;
export const path = process.env.REACT_APP_BASE_PATH;

export const handleDeploymentPath = (params) => {
    return deploy === "true" ? path.concat(params) : params;
}

export const MORTGAGE_TYPES = {
    CONVENTIONAL: "Conventional",
    FHA: "FHA",
    VA: "VA",
    CASH: "Cash",
}
export const AGENT_TYPES = {
    SELLERS: "Seller",
    BUYERS: "Buyer",
    BOTH: "Both"
}

export const PROPERTY_TYPES = {
    SINGLE_FAMILY: "Single Family",
    MULTI_FAMILY: "Multi Family",
    CONDO: "Condo"
}

// What an ordinal suffix is: https://en.wikipedia.org/wiki/Ordinal_numeral
export function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}
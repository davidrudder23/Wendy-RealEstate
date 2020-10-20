import React from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";

const useLoadGoogleSheetInfo = (
    /** The key found on a google sheet which will give access to the sheet */
    sheetKey,
    /** What sheet index would you like to load. This correlates to the sheet tabs at the bottom of google sheets */
    sheetIndex,
    /** Defines what cell range to load from the sheet. E.g., 'A:B' while load columns A and B */
    cellRange,
    /** A function is expected here and is passed the sheet object. This allows each component
     *  to decide how it wants to handle the data retrieved from the sheet.
     */
    handleSheetData,
    /**  By defining the values object at initialization we can avoid switching between controlled and uncontrolled components. */
    valuesObj,
) => {
    const [ready, setReady] = React.useState(false);
    const [sheet, setSheet] = React.useState();
    const [values, setValues] = React.useState(valuesObj);
    const [arrayData, setArrayData] = React.useState({});

    React.useEffect(() => {
        let componentIsMounted = true;
        if (componentIsMounted) {
            loadSpreadSheetInformation(componentIsMounted)
                .then(sheet => componentIsMounted ? setSheet(sheet) : null)
                .catch(error => {
                    console.log(error);
                });
            setReady(ready);
        }

        return () => (componentIsMounted = false);
        // eslint-disable-next-line
    }, []);

    const loadSpreadSheetInformation = async (componentIsMounted) => {
        const doc = new GoogleSpreadsheet(sheetKey);
        /** This json is a service account from google developer console: https://console.developers.google.com/ */
        await doc.useServiceAccountAuth(require("../wendy-realestate.json")).catch(error => console.log(error));
        await doc.loadInfo().catch(error => console.log(error));
        const sheet = doc.sheetsByIndex[sheetIndex];
        await sheet.loadCells(cellRange).catch(error => console.log(error));

        if (handleSheetData) {
            await handleSheetData(sheet, componentIsMounted);
        }

        return sheet;
    }

    return {
        ready,
        sheet,
        setSheet,
        values,
        setValues,
        arrayData,
        setArrayData
    }
}

export default useLoadGoogleSheetInfo
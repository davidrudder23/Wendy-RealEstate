import React from 'react';
// import useCustomFormHook from "../../hooks/useCustomFormHook";
import AutoComplete from "../FormFields/AutoComplete";
import { GoogleSpreadsheet } from "google-spreadsheet";
import * as S from "../FormFields/FormStyled";

const LenderTest = React.memo(({...props}) => {
    const CompanyName = [];
    const Address = [];
    // const { register, handleSubmit, errors, action, push, getValues } = useCustomFormHook();
    // const [selectedIndex, setSelectedIndex] = React.useState(-1);
    /* 
        Spreadsheet key is the long id in the sheets url
    */

    const speadSheetKey = "1t5vhaok4dHE0H40hDd0B75mRisNf7cHDHa84Vp-aNN4";
    const doc = new GoogleSpreadsheet(speadSheetKey);
    
    const loadSpreadSheetInformation = async () => {
        await doc.useServiceAccountAuth(require('../../wendy-realestate-3f1741a1359f.json'));
        await doc.loadInfo();
        const brokerSheet = doc.sheetsByIndex[0];
        await brokerSheet.loadCells('A:B');
        
        //getCell is row, column
        //Header: Company Name
        console.log(brokerSheet.getCell(0,0).value);
        //Header: Address
        console.log(brokerSheet.getCell(0,1).value);
        let index = 1;
        while(brokerSheet.getCell(index, 0).value !== null){
            CompanyName.push(brokerSheet.getCell(index,0).value);
            Address.push(brokerSheet.getCell(index,1).value);
            index++;
        }

        console.log(CompanyName);
        console.log(CompanyName.length);
        console.log(Address);

        return;
    }

    // The goal is to get a return index and set all other fields to match the selected field
    const handleOnSelect = (e, index) => {
        // I need the index from the original list this is currently returning the index from the filtered list
        console.log(index)
    }

    // Currently being call on every reload
    loadSpreadSheetInformation();

    return (
        <S.MultiContainer>
            <AutoComplete
                label="Select a Broker"
                onSelect={handleOnSelect}
                useDefaultFilter={true}
                onChange={() => {}}
                suggestions={CompanyName}
                status={true}
                filterValues={false}
                {...props}
            />
            <S.AddressWrapper>
            {/* <AutoComplete
                label="Select a Broker"
                onSelect={() => {}}
                onChange={() => {}}
                suggestions={CompanyName}
                status={true}
                filterValues={false}
                {...props}
            /> */}
            </S.AddressWrapper>
        </S.MultiContainer>
    )
})

export default LenderTest

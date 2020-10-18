import React from 'react';
// import useCustomFormHook from "../../hooks/useCustomFormHook";
import AutoComplete from "../FormFields/AutoComplete";
import { GoogleSpreadsheet } from "google-spreadsheet";
import * as S from "../FormFields/FormStyled";

const LenderTest = React.memo(({...props}) => {
    // const { register, handleSubmit, errors, action, push, getValues } = useCustomFormHook();
    const [ready, setReady] = React.useState(false);
    const [data, setData] = React.useState({
        Company: "",
        Address: "",
    });

    const [sheetData, setSheetData] = React.useState({
        CompanyName: [],
        Address: []
    });

    React.useEffect(() => {
        loadSpreadSheetInformation();
    // eslint-disable-next-line
    }, [])

    const speadSheetKey = "1t5vhaok4dHE0H40hDd0B75mRisNf7cHDHa84Vp-aNN4";
    const doc = new GoogleSpreadsheet(speadSheetKey);
    
    const loadSpreadSheetInformation = async () => {
        const CompanyName = [];
        const Address = [];
        await doc.useServiceAccountAuth(require('../../wendy-realestate-3f1741a1359f.json'));
        await doc.loadInfo();
        const brokerSheet = doc.sheetsByIndex[0];
        await brokerSheet.loadCells('A:B');
        
        //getCell is row, column
        let index = 1;
        while(brokerSheet.getCell(index, 0).value !== null){
            CompanyName.push(brokerSheet.getCell(index,0).value);
            Address.push(brokerSheet.getCell(index,1).value);
            index++;
        }

        setSheetData({
            CompanyName: CompanyName,
            Address: Address
        })

        setReady(true)
    }

    const handleOnSelect = (e, index) => {
        setData(data => {
            return {
                Company: sheetData.CompanyName[index],
                Address: sheetData.Address[index],
            }
        })
    }

    return (
        <S.MultiContainer>
            <AutoComplete
                label="Broker Name"
                onSelect={handleOnSelect}
                useDefaultFilter={true}
                onChange={(e) => setData(state => {
                    e.persist();
                    return {
                        ...state,
                        Company: e.currentTarget?.value ? e.currentTarget?.value : "",
                    }
                })}
                suggestions={sheetData.CompanyName}
                status={ready}
                value={data.Company}
                {...props}
            />
            <S.AddressWrapper>
            <AutoComplete 
                label="Address"
                onSelect={handleOnSelect}
                useDefaultFilter={true}
                onChange={(e) => setData(state => {
                    e.persist();
                    return {
                        ...state,
                        Address: e.currentTarget?.value ? e.currentTarget?.value : "",
                    }
                })}
                suggestions={sheetData.Address}
                status={ready}
                value={data.Address}
                {...props}
            />
            </S.AddressWrapper>
        </S.MultiContainer>
    )
})

export default LenderTest

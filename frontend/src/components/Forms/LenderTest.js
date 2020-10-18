import React from 'react';
// import useCustomFormHook from "../../hooks/useCustomFormHook";
import AutoComplete from "../FormFields/AutoComplete";
import { GoogleSpreadsheet } from "google-spreadsheet";
import * as S from "../FormFields/FormStyled";
import useLoadGoogleSheetInfo from "../../hooks/useLoadGoogleSheetInfo";

const LenderTest = React.memo(({...props}) => {
    // const { register, handleSubmit, errors, action, push, getValues } = useCustomFormHook();
    const handleSheetData = (brokerSheet) => {
        const companyName = [];
        const address = [];
        let index = 1;
        while(brokerSheet.getCell(index, 0).value !== null){
            companyName.push(brokerSheet.getCell(index,0).value);
            address.push(brokerSheet.getCell(index,1).value);
            index++;
        }

        setArrayData({
            CompanyName: companyName,
            Address: address
        });
    }
    const speadSheetKey = "1t5vhaok4dHE0H40hDd0B75mRisNf7cHDHa84Vp-aNN4";
    const {
        ready,
        values,
        setValues,
        arrayData,
        setArrayData 
    } = useLoadGoogleSheetInfo(
        speadSheetKey,
        0,
        'A:B',
        handleSheetData,
        {
            Company: "",
            Address: ""
        }
        );

    const handleOnSelect = (e, index) => {
        setValues(data => {
            return {
                Company: arrayData.CompanyName[index],
                Address: arrayData.Address[index],
            }
        })
    }

    return (
        <S.MultiContainer>
            <AutoComplete
                label="Broker Name"
                onSelect={handleOnSelect}
                useDefaultFilter={true}
                onChange={(e) => setValues(state => {
                    e.persist();
                    return {
                        ...state,
                        Company: e.currentTarget?.value ? e.currentTarget?.value : "",
                    }
                })}
                suggestions={arrayData.CompanyName}
                status={ready}
                value={values.Company}
                {...props}
            />
            <S.AddressWrapper>
            <AutoComplete 
                label="Address"
                onSelect={handleOnSelect}
                useDefaultFilter={true}
                onChange={(e) => setValues(state => {
                    e.persist();
                    return {
                        ...state,
                        Address: e.currentTarget?.value ? e.currentTarget?.value : "",
                    }
                })}
                suggestions={arrayData.Address}
                status={ready}
                value={values.Address}
                {...props}
            />
            </S.AddressWrapper>
        </S.MultiContainer>
    )
})

export default LenderTest

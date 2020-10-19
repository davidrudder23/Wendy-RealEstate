import React from 'react'
import * as S from "../FormFields/FormStyled";
import AutoComplete from "../FormFields/AutoComplete";
import useLoadGoogleSheetInfo from "../../hooks/useLoadGoogleSheetInfo";
import Address from "../FormFields/Address";

const Broker = React.memo(({ getValues, errors, register, represents, ...props}) => {
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
    const spreadSheetKey = "1t5vhaok4dHE0H40hDd0B75mRisNf7cHDHa84Vp-aNN4";
    const {
        ready,
        values,
        setValues,
        arrayData,
        setArrayData 
    } = useLoadGoogleSheetInfo(
        spreadSheetKey,
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
        <S.FieldWrapper>
            <S.FieldTitle>Broker Information</S.FieldTitle>
            <S.MultiContainer>
                <AutoComplete
                    name={`${represents}.broker.company`}
                    errors={errors[`${represents}`]?.broker?.company}
                    register={register}
                    getValues={getValues}
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
                <Address
                    name={`${represents}.broker.address`}
                    errors={errors[`${represents}`]?.broker?.address}
                    register={register}
                    getValues={getValues}
                    label="Address"
                    useDefaultFilter={true}
                    status={ready}
                    text={values.Address}
                    {...props}
                />
                </S.AddressWrapper>
            </S.MultiContainer>
        </S.FieldWrapper>
    )
})

export default Broker

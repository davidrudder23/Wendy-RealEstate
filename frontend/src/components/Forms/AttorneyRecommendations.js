import React from 'react';
import AutoComplete from "../FormFields/AutoComplete";
import * as S from "../FormFields/FormStyled";

const AttorneyRecommendations = ({ getValues, register, errors, represents, firms, attorneys, ready }) => {
    const [recommendedAttorneys, setrecommendedAttorneys] = React.useState([
        {name: "", firmName: ""},
        {name: "", firmName: ""},
        {name: "", firmName: ""},
    ])

    const handleOnSelect = (e, suggestionIndex, arrayIndex) => {
        let newRecommendations = [...recommendedAttorneys];
        newRecommendations[arrayIndex] = {name: attorneys[suggestionIndex], firmName: firms[suggestionIndex]}
        setrecommendedAttorneys(state => [...newRecommendations])
    }

    const attorneyFieldsForRecommendation = () => {
    let attorneyRecommendations = [];
    for(let i = 0; i < 3; i++){
        attorneyRecommendations.push(
            <S.MultiContainer key={i}>
            <AutoComplete
                    value={recommendedAttorneys[i].name}
                    onChange={(e) => {
                        e.persist();
                        setrecommendedAttorneys(array => [...array, array[i] = {...array[i], name: e.currentTarget?.value ? e.currentTarget?.value : ""}])
                    }}
                    suggestions={attorneys}
                    getValues={getValues}
                    name={`attorney.${represents}.recommended.${i}.name`}
                    label="Full Name"
                    errors={errors?.attorney?.[represents]?.recommended?.[i]?.name}
                    required={true}
                    register={register}
                    onSelect={(e, suggestionIndex) => handleOnSelect(e, suggestionIndex, i)}
                    status={ready}
                />
                <S.AddressWrapper>
                    <AutoComplete
                        value={recommendedAttorneys[i].firmName}
                        onChange={(e) => {
                        e.persist();
                            setrecommendedAttorneys(array => [...array, array[i] = {...array[i], firmName: e.currentTarget?.value ? e.currentTarget?.value : ""}])
                        }}
                        suggestions={firms}
                        getValues={getValues}
                        name={`attorney.${represents}.recommended.${i}.firmName`}
                        label="Attorney Firm Name"
                        errors={errors?.attorney?.[represents]?.recommended?.[i]?.firmName}
                        required={false}
                        register={register}
                        status={ready}
                        onSelect={(e, suggestionIndex) => handleOnSelect(e, suggestionIndex, i)}
                    />
                </S.AddressWrapper>
            </S.MultiContainer>
        )
        }
    return (
        <S.FieldWrapper>
            <S.FieldTitle>Please select Attorney's from provided list.</S.FieldTitle>
            {attorneyRecommendations.map((value) => value)}
        </S.FieldWrapper>
    )
    }

    return (attorneyFieldsForRecommendation())
}

export default AttorneyRecommendations

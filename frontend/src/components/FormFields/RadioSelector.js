import React from 'react';
import * as S from "./RadioSelectorStyled";
import InputField from "./InputField";

const RadioSelector = React.memo(({ register, name, array, other=false, defaultVal, getValues, watch }) => {
    /* 
        Lines 9 -> 13 Takes care of the inputfield value on return to the page
        if it was a selected as the option. If it was not selected then it will
        be set to ""
    */
    let watchVal = watch ? watch(name) : false;
    let textFieldHasValue = watchVal ? !array.includes(watchVal) : "";
    const [otherVal, setOtherVal] = React.useState({
        text: textFieldHasValue ? watchVal : ""
    })

    const handleSetOtherVal = (e) => {
        setOtherVal(state => {
            return {
                text: e.target.value
            }
        });
        e.persist();
    }

    // TODO: Make Labels Clickable? Improves interaction for older/elderly users
    return (
        <React.Fragment>
            <S.Container>
                {array.map((value) => (
                    <S.optionWrapper key={`input-${value}`}>
                        <S.InputRadio 
                        name={name} 
                        type="radio" 
                        defaultValue={value} 
                        defaultChecked={value === defaultVal} 
                        ref={register} />
                        <S.Label>
                            {value}
                        </S.Label>
                    </S.optionWrapper>
                ))}
            </S.Container>
            {other ?
                <S.OtherWrapper>
                    <S.InputRadio
                    value={otherVal?.text}
                    name={name}
                    type="radio"
                    style={{marginTop: "1.825rem"}}
                    defaultChecked={otherVal?.text === defaultVal}
                    ref={register}
                    />
                    <div style={{float: "right"}}>
                        <InputField
                        onChange={handleSetOtherVal}
                        value={otherVal?.text}
                        label="Other"
                        required={false}
                        getValues={getValues}
                         />
                    </div>
                </S.OtherWrapper> 
            : null }
        </React.Fragment>
    )
})

export default RadioSelector

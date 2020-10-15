import React from 'react';
import * as S from "./RadioSelectorStyled";
import InputField from "./InputField";

const RadioSelector = React.memo(({ register, name, array, other=false, defaultVal }) => {
    const selectedVal = React.createRef();
    const [otherVal, setOtherVal] = React.useState("")

    // To create a radio group you must used uncontrolled components.
    // Documentation: https://reactjs.org/docs/uncontrolled-components.html
    return (
        <React.Fragment>
            <S.Container>
                {array.map((value) => (
                    <S.optionWrapper key={`input-${value}`}>
                        <S.InputRadio name={name} type="radio" value={value} defaultChecked={selectedVal === defaultVal} ref={register} />
                        <S.Label>
                            {value}
                        </S.Label>
                    </S.optionWrapper>
                ))}
            </S.Container>
            {other ?
                <S.OtherWrapper>
                    <S.InputRadio name={name} type="radio" style={{marginTop: "1.825rem"}} defaultChecked={selectedVal === "test2"} value={otherVal}/>
                    <div style={{float: "right"}}>
                        <InputField 
                        name={name} 
                        label="Other" 
                        register={register} 
                        required={false} />
                    </div>
                </S.OtherWrapper> 
            : null }
        </React.Fragment>
    )
})

export default RadioSelector

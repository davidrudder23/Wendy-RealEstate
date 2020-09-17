import React from 'react';
import * as S from "./InputFieldStyled";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ control, name, label, errors, required, className }) => {
    const classVal = required ? `${className} required-field`: className;
    
    const [isEmpty, setIsEmpty] = React.useState(false);
    
    return (
        <S.InputField isEmpty={isEmpty}>
            <Controller
                control={control}
                name={name}
                rules={{ required: required }}
                defaultValue=""
                render={(props) => (
                <DatePicker
                    defaultValue=""
                    placeholderText=""
                    className="input"
                    onChange={(e) => {
                        props.onChange(e)
                        setIsEmpty(true);
                        if(e === null){
                            setIsEmpty(false)
                        }
                    }}
                    onBlur={(e) => {
                        if(e.target.value === ""){
                            setIsEmpty(false);
                        }
                        e.preventDefault();
                    }}
                    onFocus={(e) => {
                        setIsEmpty(true)
                        e.stopPropagation();
                    }}
                    selected={props.value}
                    closeOnScroll={true}
                />
                )}
            />
            <label className={classVal}>{label}</label>
            {required && errors && <span>Required Field</span>}
        </S.InputField>  
    )
}

export default CustomDatePicker

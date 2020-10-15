import React from 'react';
import * as S from "./InputFieldStyled";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import useCheckFieldValue from "../../hooks/useCheckFieldValue"

const CustomDatePicker = ({ control, name, label, errors, required, className, showYearPicker, dateFormat="MM/dd/yyyy", getValues, ...rest }) => {
    const classVal = required ? `${className} required-field`: className;
    const { isEmpty, setIsEmpty } = useCheckFieldValue(name, getValues);
    
    return (
        <S.InputField disablePadding={true} isEmpty={isEmpty}>
            <Controller
                control={control}
                name={name}
                defaultValue={null}
                {...rest}
                render={(props) => {
                return <DatePicker
                    showYearPicker={showYearPicker}
                    dateFormat={dateFormat}
                    defaultValue={null}
                    placeholderText={null}
                    startDate={null}
                    className="input"
                    selected={ props.value !== null ? new Date(props.value) : null}
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
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                />
                }}
            />
            <label className={classVal}>{label}</label>
            {required && errors && <span>Required Field</span>}
        </S.InputField>  
    )
}

export default CustomDatePicker

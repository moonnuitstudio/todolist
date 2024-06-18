import React from 'react'

import DatePicker, { DateObject } from "react-multi-date-picker";

import styled from 'styled-components';
import { FieldValues, UseFormSetValue } from "react-hook-form";

const DateContainer = styled.div`
  flex-grow: 1;
  &>.rmdp-container {
    width: 100%;
    &>input {
      font-family: "Montserrat" !important;
      font-size: 1rem;
      font-weight: 400;
      width: 100%;
      padding: 11px 5px 11px 10px;
      background: transparent;
      border: none !important;
      outline: none !important;
      height: fit-content !important;
    }
  }

  &.disabled {
    &>.rmdp-container>input {
      color: grey;
      background: rgba(0, 0, 0, .05);
    }
  }
`;

interface InputDateType {
  id: string;
  placeholder: string;
  value: number | string  | Date;
  setValue: UseFormSetValue<FieldValues>;
  disabled?: boolean;
  minDate?: undefined | Date;
}

const InputDate:React.FC<InputDateType> = ({ id, placeholder, value, setValue, disabled=false, minDate=undefined }) => {

  const datevalue = React.useMemo(() => {

    if (value) {
      if (value instanceof DateObject) return value
      else if (typeof value === "string" && value !== "") {
        const [y, m, d] = value.split("-")

        return new DateObject().set({
          year: parseInt(y? y : "0"),
          month: parseInt(m? m : "0"),
          day: parseInt(d? d : "0"),
        })  
      }
    }
    
    return null
  }, [value])

  const dateToString = (date: DateObject) => {
    return `${date.year}-${date.month}-${date.day}`
  }

  return (
    <DateContainer>
      <DatePicker id={`input-${id}`} value={datevalue} disabled={disabled} readOnly={disabled} minDate={minDate} format="MM/DD/YYYY" placeholder={placeholder} onChange={(date:DateObject) => { 
        setValue(id, date?.isValid ? dateToString(date) : "", { shouldValidate: true }); 
      }} />
    </DateContainer>
  )
}

export default InputDate
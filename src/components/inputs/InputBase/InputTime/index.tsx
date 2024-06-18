import React from 'react'

import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

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

interface InputTimeType {
  id: string;
  placeholder: string;
  value: number | string | DateObject;
  setValue: UseFormSetValue<FieldValues>;
  disabled?: boolean;
}

const InputTime:React.FC<InputTimeType> = ({ id, placeholder, value, setValue, disabled=false}) => {


  const datevalue = React.useMemo(() => {

    if (value) {
      if (value instanceof DateObject) return value
      else if (typeof value === "string" && value !== "") {
        
        const [h, m] = `${value}`.split(":")

        return new DateObject().set({
          hour: parseInt(h? h : "0"),
          minute: parseInt(m? m : "0"),
        })  
      }
    }

    return null
  }, [value])

  return (
    <DateContainer>
        <DatePicker id={`input-${id}`} value={datevalue} disabled={disabled} readOnly={disabled} disableDayPicker format="HH:mm" placeholder={placeholder} onChange={(date:DateObject) => { setValue(id, date?.isValid ? date : "", { shouldValidate: true }) }} plugins={[<TimePicker hideSeconds /> ]}  />
    </DateContainer>
  )
}

export default InputTime
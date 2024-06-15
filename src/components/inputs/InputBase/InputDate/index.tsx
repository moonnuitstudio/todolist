import React from 'react'

import DatePicker, { DateObject } from "react-multi-date-picker";

import styles from './InputDate.module.css'

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
  value: string;
  error?: boolean;
  //register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  disabled?: boolean;
  minDate?: undefined | Date;
}

const InputDate:React.FC<InputDateType> = ({ id, placeholder, value, setValue, error=false, disabled=false, minDate=undefined }) => {

  return (
    <DateContainer>
      <DatePicker id={`input-${id}`} value={value || null} disabled={disabled} readOnly={disabled} minDate={minDate} format="MM/DD/YYYY" placeholder={placeholder} onChange={(date:DateObject) => { 
        setValue(id, date?.isValid ? date : null, { shouldValidate: true }); 
      }} />
    </DateContainer>
  )
}

export default InputDate
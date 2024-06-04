import React from 'react'

import DatePicker, { DateObject } from "react-multi-date-picker";

import styles from './InputDate.module.css'

import styled from 'styled-components';
import { FieldValues, UseFormSetValue } from "react-hook-form";

const DateContainer = styled.div`
  &>.rmdp-container {
    width: 100%;
    &>input {
      font-family: "Montserrat" !important
      font-size: 1.1rem;
      font-weight: 400;

      padding: 12px 20px;
      background: transparent;
      
      border: 1px solid #206c65;
      border-radius: 4px;

      outline: none !important;

      transition: box-shadow .2s ease-in-out, border .2s ease-in-out;

      height: fit-content !important;

      margin: 0px !important;

      &:hover {
        -webkit-box-shadow: 0px 5px 20px -10px rgba(32, 108, 101, 1);
        -moz-box-shadow: 0px 5px 20px -10px rgba(32, 108, 101, 1);
        box-shadow: 0px 5px 20px -10px rgba(32, 108, 101, 1);
      }
    }
  }

  &.full-width>.rmdp-container>input {
    width: 100%;
  }

  &.input-err {
    &>.rmdp-container>input {
      border: 1px solid rgb(142, 49, 49);
      &:hover {
        -webkit-box-shadow: 0px 5px 20px -7px rgba(142, 49, 49,1);
        -moz-box-shadow: 0px 5px 20px -7px rgba(142, 49, 49,1);
        box-shadow: 0px 5px 20px -10px rgba(142, 49, 49,1);
      }
    }
  }

  &.disabled {
    &>.rmdp-container>input {
      color: grey;

      box-shadow: none !important;
      border-color: black;

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
  minDate?: Date;
}

const InputDate:React.FC<InputDateType> = ({ id, placeholder, value, setValue, error=false, disabled=false, minDate }) => {

  return (
    <DateContainer className={`${styles.dateContainer} full-width ${disabled && 'disabled'} ${error && 'input-err'}`}>
        <DatePicker value={value || null} disabled={disabled} readOnly={disabled} minDate={minDate} format="MM/DD/YYYY" placeholder={placeholder} onChange={(date:DateObject) => { 
          setValue(id, date?.isValid ? date : null, { shouldValidate: true }); 
        }} />
    </DateContainer>
  )
}

export default InputDate
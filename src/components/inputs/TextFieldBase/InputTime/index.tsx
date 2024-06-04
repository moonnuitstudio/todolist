import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import styles from './InputTime.module.css'

import styled from 'styled-components';
import { FieldValues, UseFormSetValue } from "react-hook-form";

const DateContainer = styled.div`
  &>.rmdp-container {
    width: 100%;
    &>input {
      font-family: "Montserrat" !important;
      font-size: 1.1rem;
      font-weight: 400;

      padding: 12px 20px;
      background: transparent;
      
      border: 1px solid #206c65;
      border-radius: 4px;

      outline: none !important;

      margin: 0px !important;

      transition: box-shadow .2s ease-in-out, border .2s ease-in-out;

      height: fit-content !important;

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

interface InputTimeType {
  id: string;
  placeholder: string;
  error?: boolean;
  value: string;
  setValue: UseFormSetValue<FieldValues>;
  disabled?: boolean;
}

const InputTime:React.FC<InputTimeType> = ({ id, placeholder, value, setValue, disabled=false, error=false }) => {

  return (
    <DateContainer className={`${styles.dateContainer} full-width ${disabled && 'disabled'} ${error && 'input-err'}`}>
        <DatePicker value={value || ""} disabled={disabled} readOnly={disabled} disableDayPicker format="HH:mm" placeholder={placeholder} onChange={(date:DateObject) => { setValue(id, date?.isValid ? date : "", { shouldValidate: true }) }} plugins={[<TimePicker hideSeconds /> ]}  />
    </DateContainer>
  )
}

export default InputTime
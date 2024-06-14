import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import styles from './InputTime.module.css'

import styled from 'styled-components';
import { FieldValues, UseFormSetValue } from "react-hook-form";

const DateContainer = styled.div`
  flex-grow: 1;
  &>.rmdp-container {
    width: 100%;
    &>input {
      font-family: "Montserrat" !important;
      font-size: .9rem;
      font-weight: 400;
      width: 100%;
      padding: 8px 5px 8px 10px;
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
  error?: boolean;
  value: string;
  setValue: UseFormSetValue<FieldValues>;
  disabled?: boolean;
}

const InputTime:React.FC<InputTimeType> = ({ id, placeholder, value, setValue, disabled=false, error=false }) => {

  return (
    <DateContainer>
        <DatePicker id={`input-${id}`} value={value || ""} disabled={disabled} readOnly={disabled} disableDayPicker format="HH:mm" placeholder={placeholder} onChange={(date:DateObject) => { setValue(id, date?.isValid ? date : "", { shouldValidate: true }) }} plugins={[<TimePicker hideSeconds /> ]}  />
    </DateContainer>
  )
}

export default InputTime
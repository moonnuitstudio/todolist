import React from "react"

import { styled } from '@mui/system'

import Box from '@mui/material/Box'

import styles from "./InputSelect.module.css";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface KeyValue {
    id: string;
    name: string;
}

interface InputSelectPropsTypes {
    id: string;
    register: UseFormRegister<FieldValues>;
    err?: boolean;
    disabled?: boolean;
    values?: KeyValue[];
}

const SelectBox = styled(Box, {
    shouldForwardProp: (props) => props !== "selectColor"
})(({ selectColor }) => ({
    position: 'relative',
    width: '100%', 
    padding: '0px !important',
    '&::after': {
        content: '"▼"',
        display: 'block',
        fontSize: '1rem',
        color: selectColor,
        position: 'absolute',
        zIndex: '-99',
        top: '50%',
        right: '15px',
        transform: 'translate(0, -50%)',
    }
}))

const InputSelect = ({ id, register, err=false, disabled=false, values=[] }:InputSelectPropsTypes) => {

    const selectColor = React.useMemo(() => {
        if (disabled) return 'rgba(0,0,0,.3)'
        else if (err) return 'rgb(142, 49, 49)'

        return '#206C65'
    }, [disabled, err])

    return (
        <SelectBox selectColor={selectColor}>
            <select id={`input-${id}`} disabled={disabled} className={styles.selectBase} style={{width: '100%'}} {...register(id)}>
                {
                    values?.map((value, index) => (
                        <option key={`select_${index}_${value.id}_${value.name}`} value={value.id} style={{ margin: '10px 5px' }}>{value.name}</option>
                    ))
                }
            </select>
        </SelectBox>
    )
}

export default InputSelect
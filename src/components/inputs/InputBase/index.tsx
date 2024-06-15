import React from "react"

import { styled } from '@mui/system'

import { useFormContext } from "react-hook-form"

import Stack from '@mui/material/Stack'

import IconButton from '@mui/material/IconButton'

import styles from "./InputBase.module.css"

import InputSelect from "./InputSelect"
import InputDate from "./InputDate"
import InputTime from "./InputTime"

type EndIconHanldeType = () => void

interface KeyValue {
    id: number | string;
    name: string;
}

interface InputBasePropsType {
    id: string;
    title: string;
    values?: KeyValue[];
    placeholder?: null | string;
    type?: string;
    disabled?: boolean;
    endIcon?: null | React.ReactNode;
    defaultvalue?: number | string;
    minDate?: undefined | Date;
    onEndIconClick?: null | EndIconHanldeType;
}

const InputContainer = styled(Stack)(() => ({
    width: '100%' , 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '4px',
    marginBottom: '20px',
}))

const InputBox = styled(Stack, {
    shouldForwardProp: (props) => props !== 'disabled' && props !== 'inputBorderColor'
})(({ disabled, inputBorderColor }) => ({
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%' , 
    border: `1px solid ${inputBorderColor}`,
    borderRadius: '4px',
    transition: 'box-shadow .2s ease-in-out, border .2s ease-in-out',
    ...(!disabled && {
        '&:hover': {
            boxShadow: `0px 5px 20px -10px ${inputBorderColor}`
        }
    })
}))

const InputBase = ({ id, title, placeholder=null, type="text", values=[], disabled=false, endIcon=null, defaultvalue="", minDate=undefined, onEndIconClick=null }:InputBasePropsType) => {

    const { register, setValue, watch, formState: { errors }, trigger } = useFormContext() 

    const [fieldValue, setFieldValue] = React.useState<number | string>(defaultvalue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const isErr = React.useMemo(() => !!errors[id], [ errors, errors[id], id ])
    const errMessage = React.useMemo(():string => isErr? `${errors[id]!.message}` : '', [isErr, errors, id])

    const inputBorderColor = React.useMemo(() => {
        if (disabled) return 'rgba(0,0,0,.3)'
        else if (isErr) return 'rgb(142, 49, 49)'

        return '#206C65'
    }, [disabled, isErr])

    const inputClassNames = React.useMemo<string>(() => {
        const classes = [styles.inputBase]

        if (isErr) classes.push(styles.inputBaseErr)
        if (disabled) classes.push(styles.disabledField)

        return classes.join(" ")
    }, [isErr, disabled])

    React.useEffect(() => {
        if ((type === "date" || type === "select") && defaultvalue) setFieldValue(defaultvalue)
    }, [setFieldValue, defaultvalue, type])

    React.useEffect(() => {
        const subscription = watch((value) => {
            if (value) {
                if (typeof value[id] === 'number') setFieldValue(parseInt(value[id]))
                else setFieldValue(value[id])
            }      
        })
        return () => subscription.unsubscribe()
    }, [watch, id, setFieldValue])

    React.useEffect(() => {
        if (disabled) {
            setFieldValue("")
            
            if (type == "date") setValue(id, null, { shouldValidate: false })
            else if(type !== "select") setValue(id, "", { shouldValidate: false })

            trigger(id)
        }
    }, [setFieldValue, setValue, trigger, disabled, id, type])

    // GET INPUT ----------------------------------------------------------------------------
    const InputElement = React.useMemo(():React.ReactNode => {
        switch(type) {
            case "time":
                return (<InputTime value={fieldValue} disabled={disabled} id={id} placeholder={placeholder || ""} setValue={setValue} error={isErr} />)
            case "date":
                return (<InputDate value={fieldValue} disabled={disabled} id={id} placeholder={placeholder || ""} setValue={setValue} error={isErr} minDate={minDate} />)
            case "textarea":
                return (<textarea id={`input-${id}`} placeholder={placeholder || ""} rows={4} cols={50} disabled={disabled} style={{width: '100%'}} className={inputClassNames} {...register(id)} />)
            case "select": 
                return (<InputSelect disabled={disabled} id={id} values={values} setValue={setValue} value={fieldValue} err={isErr} />)
            default:
                return (<input id={`input-${id}`} className={inputClassNames} type={type} placeholder={placeholder || ""} {...register(id)} />)
        }
    }, [type, values, id, inputClassNames, register, disabled, isErr, placeholder, fieldValue, minDate, setValue])

    return (
        <InputContainer>
            <label htmlFor={`input-${id}`} className={styles.fieldName}>{title}</label>
            <InputBox inputBorderColor={inputBorderColor} disabled={disabled}>
                {InputElement}
                {endIcon && (type === "text" || type === "number") && (<IconButton onClick={() => { onEndIconClick?.() }} disableRipple>{endIcon}</IconButton>)}
            </InputBox>
            {isErr && (
                <p className={`${styles.errField} non-mouse-event`} >{errMessage}</p>
            )}
        </InputContainer>
    )
}

export default InputBase
import React from "react"

import styles from "./InputSelect.module.css";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface KeyValue {
    id: string;
    name: string;
}

interface InputSelectProps {
    id: string;
    err: boolean;
    disabled?: boolean;
    values?: KeyValue[];
    register: UseFormRegister<FieldValues>;
}

const InputSelect:React.FC<InputSelectProps>  =  ({  values, id, register, err, disabled=false }) => {

    const inputclassnames = React.useMemo(() => {
        const classes = [styles.inputBase]

        if (err) {
            classes.push(styles.inputBaseErr)
        }

        if (disabled) classes.push(styles.disabledField)

        return classes
    }, [err, disabled])

    const containerclassnames = React.useMemo(() => {
        const classes = [styles.inputContainer]

        if (err) {
            classes.push(styles.inputContainerErr)
        }

        return classes
    }, [err])


    return (
        <div className={containerclassnames.join(" ")} style={{width: '100%'}}>
            <select disabled={disabled} className={inputclassnames.join(" ")} style={{width: '100%'}} {...register(id)}>
                {
                    values?.map((value, index) => (
                        <option key={`select_${index}_${value.id}_${value.name}`} value={value.id}>{value.name}</option>
                    ))
                }
            </select>
        </div>
    )

}

export default InputSelect
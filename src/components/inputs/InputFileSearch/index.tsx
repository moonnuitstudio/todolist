import React from 'react'

import styles from './InputFileSearch.module.css'

type handleFileBrowserType = (fr: FileReader, file: File | undefined | null) => void

type handleInputRefType = (ref: React.RefObject<HTMLInputElement>) => void

interface InputFileSearchProps {
    handleFileBrowser: handleFileBrowserType;
    id: string;
    handleInputRef?: handleInputRefType;
}

const InputFileSearch:React.FC<InputFileSearchProps> = ({ handleFileBrowser, handleInputRef, id }) => {

    const ref = React.useRef(null)

    const handleOpenFile = (e: React.ChangeEvent<HTMLInputElement>):void => {
        
        if (e.target.files && e.target.files?.length) {
            const inputEvent = e.target as HTMLInputElement;

            const file = inputEvent.files?.item(0)
            const fr = new FileReader();

            fr.onload = function () {
                handleFileBrowser(fr, file)
            }
        
            const blob = new Blob([file || new File([], "")],{type: file?.type})
            fr.readAsDataURL(blob)
        }
    }

    React.useEffect(() => {
        if (ref) {
            handleInputRef?.(ref)
        }
    }, [ref, handleInputRef])
    

    return (
        <div>
            <input id={id} ref={ref} type="file" accept="image/png, image/gif, image/jpeg" onChange={handleOpenFile} hidden/>
            <label className={styles.btn} htmlFor={id}>Choose file</label>
        </div>
    )
}

export default InputFileSearch

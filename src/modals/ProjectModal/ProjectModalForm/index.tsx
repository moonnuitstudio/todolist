import * as yup from "yup";
import React from 'react'
import { styled } from '@mui/system'

import { FormProvider, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { ProjectSchema } from "../../../schemas"

import TextFieldBase from "../../../components/inputs/TextFieldBase";

import Box from '@mui/material/Box'
import Button from "@mui/material/Button";

import useProjects from "../../../hooks/useProjects";
import useToast from '../../../hooks/useToast'

import { ERR_TYPE_BY_MULTIPLE_FIELDS } from '../../../types/errTypes'

type ProjectType = yup.InferType<typeof ProjectSchema>
type CloseModalHandleType = () => void

const initValues:ProjectType = { 
    title: ''
}

const Form = styled('form')(() => ({
    width: '100%',
    paddingTop: '20px'
}))

interface ProjectModalFormProp {
    isEdit: boolean;
    project: ProjectType;
    handleCloseModal: CloseModalHandleType;
}

const ProjectModalForm = ({ isEdit, project, handleCloseModal }:ProjectModalFormProp) => {

    const { saveProject } = useProjects()
    const { showSuccessToast, showErrorToast } = useToast()

    const defaultValues = React.useMemo(() => {
        return isEdit? project : initValues
    }, [isEdit, project])

    const methods = useForm<ProjectType>({
        defaultValues,
        resolver: yupResolver(ProjectSchema), 
        mode: "onChange"
    });

    const onSubmit = (data:ProjectType) => {
        saveProject(data, (status, data) => {
            if (status) {
                showSuccessToast("The new project has been successfully registered.")
                handleCloseModal()
            } else {
                console.log(data)
                const { err_type } = data

                switch(err_type) {
                    case ERR_TYPE_BY_MULTIPLE_FIELDS:
                        const { fields } = data

                        for (var field in fields) {
                            methods.setError(field.toLowerCase(), { type: 'custom', message: fields[field] })
                        }
                        
                        break;
                }

                showErrorToast("The project could not be registered.")
            }
        })
    }

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <TextFieldBase id="title" title='Project Name*' placeholder="Default" />
                <Box mt={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                    <Button onClick={() => { methods.reset() }} disableFocusRipple disableRipple>Reset Form</Button>
                    <span className='non-mouse-event'>/</span>
                    <Button variant="outlined" type="submit" size="large" sx={{ paddingTop: '12px', paddingBottom: '12px' }}>{isEdit? 'Update' : 'Register'}</Button>
                </Box>
            </Form>
        </FormProvider>
    )
}

export default ProjectModalForm

import * as yup from "yup";
import React from 'react'
import { styled } from '@mui/system'

import { FormProvider, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { ProjectSchema } from "../../../schemas"
import { ProjectSchemaType, ProjectType } from "../../../models/Project"

import InputBase from "../../../components/inputs/InputBase";

import Box from '@mui/material/Box'
import Button from "@mui/material/Button"
import ButtonGroup from '@mui/material/ButtonGroup'

import useProjects from "../../../hooks/useProjects"
import useToast from '../../../hooks/useToast'

import { ERR_TYPE_BY_MULTIPLE_FIELDS } from '../../../types/errTypes'

type CloseModalHandleType = () => void

const initValues:ProjectSchemaType = { 
    title: ''
}

const Form = styled('form')(() => ({
    width: '100%',
    paddingTop: '20px'
}))

const CustomButton = styled(Button)(() => ({
    fontFamily: '"Montserrat" !important',
    fontSize: '.9rem',
    fontWeight: '400',
    textTransform: 'capitalize',
    paddingLeft: '10px',
    paddingRight: '10px',
}))

interface ProjectModalFormProp {
    isEdit: boolean;
    project: ProjectSchemaType | ProjectType;
    handleCloseModal: CloseModalHandleType;
}

const ProjectModalForm = ({ isEdit, project, handleCloseModal }:ProjectModalFormProp) => {

    const { saveProject, updateProject } = useProjects()
    const { showSuccessToast, showErrorToast } = useToast()

    const defaultValues = React.useMemo(() => {
        return isEdit? project : initValues
    }, [isEdit, project])

    const methods = useForm<ProjectSchemaType>({
        defaultValues,
        resolver: yupResolver(ProjectSchema), 
        mode: "onChange"
    });

    const showErrFields = (data:unknown) => {
        const { err_type } = data

        switch(err_type) {
            case ERR_TYPE_BY_MULTIPLE_FIELDS:
                const { fields } = data

                for (var field in fields) {
                    methods.setError(field.toLowerCase(), { type: 'custom', message: fields[field] })
                }
                
                break;
        }
    }
    
    const postSaveProject = (_data:ProjectSchemaType) => {
        saveProject(_data, (status, data) => {
            if (status) {
                showSuccessToast("The new project has been successfully registered.")
                handleCloseModal()
            } else {
                showErrFields(data)
                showErrorToast("The project could not be registered.")
            }
        })
    }

    const putUpdateProject = (id:number, _data:ProjectSchemaType) => {
        updateProject(id, _data, (status, data) => {
            if (status) {
                showSuccessToast("Project has been successfully updated.")
                handleCloseModal()
            } else {
                showErrFields(data)
                showErrorToast("The project could not be updated.")
            }
        })
    }

    const onSubmit = (data:ProjectSchemaType) => {
        if (isEdit) {
            putUpdateProject(project.id, data)
        } else {
            postSaveProject(data)
        }     
    }

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <InputBase id="title" title='Project Name*' placeholder="Default" />
                <Box mt={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                    <ButtonGroup variant="text">
                        <CustomButton onClick={() => { methods.reset() }} disableFocusRipple disableRipple>Reset Form</CustomButton>
                        <CustomButton type="submit" sx={{ textTransform: 'uppercase', fontWeight: '500' }}>{isEdit? 'Update' : 'Register'}</CustomButton>
                    </ButtonGroup>
                </Box>
            </Form>
        </FormProvider>
    )
}

export default ProjectModalForm

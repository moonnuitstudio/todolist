import * as yup from "yup";
import React from 'react'
import { styled } from '@mui/system'

import { FormProvider, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { ProjectSchema } from "../../../schemas"

import TextFieldBase from "../../../components/inputs/TextFieldBase";

import Box from '@mui/material/Box'
import Button from "@mui/material/Button";

type ProjectType = yup.InferType<typeof ProjectSchema>

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
}

const ProjectModalForm = ({ isEdit, project }:ProjectModalFormProp) => {

    const defaultValues = React.useMemo(() => {
        return isEdit? project : initValues
    }, [isEdit, project])

    const methods = useForm<ProjectType>({
        defaultValues,
        resolver: yupResolver(ProjectSchema), 
        mode: "onChange"
    });

    const onSubmit = (data:ProjectType) => {

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

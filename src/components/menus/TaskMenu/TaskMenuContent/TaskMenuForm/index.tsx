import * as yup from "yup";
import React from 'react'
import { styled } from '@mui/system'

import { FormProvider, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { TaskSchema } from "../../../../../schemas"

import TextFieldBase from "../../../../inputs/TextFieldBase";

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from "@mui/material/Button";

import IconButton from '@mui/material/IconButton'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

import EventFormTitle from "../../../../forms/decorations/EventFormTitle";

import { TableTaskType } from "../../../../../models/Todo";

import useProjects from "../../../../../hooks/useProjects";

type FormFields = yup.InferType<typeof TaskSchema>

const initValues:FormFields = { 
    title: '',
    description: '',
    duedate: null,
    duetime: ''
}

const Form = styled('form')(() => ({
    width: '100%',
    paddingTop: '20px'
}))

interface TaskMenuFormProp {
    isEdit: boolean;
    task: TableTaskType;
}

const TaskMenuForm = ({ isEdit, task }:TaskMenuFormProp) => {

    const { projects } = useProjects()

    const defaultValues = React.useMemo(() => {
        return isEdit? {
            title: task.title,
            description: '',
            duedate: null,
            duetime: ''
        } : initValues
    }, [isEdit, task])

    const selectProjectsValue = React.useMemo(() => {
        return projects.map(( project ) => ({
            id: project.id,
            name: project.title,
        }))
    }, [projects])

    const methods = useForm<FormFields>({
        defaultValues,
        resolver: yupResolver(TaskSchema), 
        mode: "onChange"
    });

    const onSubmit = (data:FormFields) => {

    }

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <TextFieldBase id="title" title='Task*' placeholder="Buy groceries" endIcon={<IconButton aria-label="stared"><StarBorderIcon /></IconButton>} />
                <TextFieldBase id="project" title='Project' placeholder="Default" type="select" values={selectProjectsValue} />
                <Grid container>
                    <Grid item  xs={12} sm={6}>
                        <TextFieldBase id="status" title='Status' type="select" values={[ { id: 2, name: 'To Do' }, {id: 1, name: 'Done'} ]} />
                    </Grid>
                </Grid>
                <TextFieldBase id="description" title='Task Description' placeholder="Get fresh fruits (apples, bananas, oranges)" type="textarea" />
                <EventFormTitle title="Deadline" />
                <Grid container>
                    <Grid item xs={8} pr={2}>
                        <TextFieldBase id="duedate" title='Date' placeholder="Start date" type="date" defaultvalue={initValues.duedate} minDate={new Date()} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextFieldBase id="duetime" title='Time' placeholder="HH:MM" type="time" />
                    </Grid>
                </Grid>
                <Box mt={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                    <Button onClick={() => { methods.reset() }} disableFocusRipple disableRipple>Reset Form</Button>
                    <span className='non-mouse-event'>/</span>
                    <Button variant="outlined" type="submit" size="large" sx={{ paddingTop: '12px', paddingBottom: '12px' }}>{isEdit? 'Update' : 'Register'}</Button>
                </Box>
            </Form>
        </FormProvider>
    )
}

export default TaskMenuForm

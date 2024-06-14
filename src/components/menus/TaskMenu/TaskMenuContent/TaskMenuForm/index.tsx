import * as yup from "yup"
import React from 'react'
import { styled } from '@mui/system'

import { FormProvider, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { TaskSchema } from "../../../../../schemas"

import TextFieldBase from "../../../../inputs/TextFieldBase"

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import ButtonGroup from '@mui/material/ButtonGroup'
import Button from "@mui/material/Button"

import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import IconButton from '@mui/material/IconButton'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

import InputBase from "../../../../inputs/InputBase"

import EventFormTitle from "../../../../forms/decorations/EventFormTitle"

import { TableTaskType } from "../../../../../models/Todo"

import useProjects from "../../../../../hooks/useProjects"

type FormFields = yup.InferType<typeof TaskSchema>

const initValues:FormFields = { 
    title: '',
    description: '',
    duedate: undefined,
    duetime: ''
}

const Form = styled('form')(() => ({
    width: '100%',
    paddingTop: '20px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',

}))

const CustomButton = styled(Button)(() => ({
    fontFamily: '"Montserrat" !important',
    fontSize: '.9rem',
    fontWeight: '400',
    textTransform: 'capitalize',
    paddingLeft: '10px',
    paddingRight: '10px',
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
                <Box sx={{ flexGrow: 1 }}>
                    <InputBase id="title" title="Task*" placeholder="Buy groceries" endIcon={<StarBorderIcon />} onEndIconClick={() => { alert('TEST') }} />
                    <InputBase id="project" title="Project" placeholder="Default" type="select" values={selectProjectsValue} />
                    <Grid container>
                        <Grid item  xs={12} sm={6}>
                            <InputBase id="status" title='Status' type="select" values={[ { id: '2', name: 'To Do' }, {id: '1', name: 'Done'} ]} />
                        </Grid>
                    </Grid>
                    <InputBase id="description" title="Task Description" placeholder="Get fresh fruits (apples, bananas, oranges)" type="textarea" />

                    <Accordion elevation={0}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Deadline
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container>
                                <Grid item xs={8} pr={2}>
                                    <InputBase id="duedate" title='Date' placeholder="Start date" type="date" defaultvalue={initValues.duedate} minDate={new Date()} />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputBase id="duetime" title='Time' placeholder="HH:MM" type="time" />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box mt={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', borderTop: '1px solid rgba(0, 0, 0, .3)', paddingTop: '10px' }}>
                    <ButtonGroup variant="text" aria-label="Basic button group">
                        <CustomButton onClick={() => { methods.reset() }} disableFocusRipple disableRipple>Reset Form</CustomButton>
                        <CustomButton type="submit" sx={{ textTransform: 'uppercase', fontWeight: '500' }}>{isEdit? 'Update' : 'Register'}</CustomButton>
                    </ButtonGroup>
                </Box>
            </Form>
        </FormProvider>
    )
}

export default TaskMenuForm

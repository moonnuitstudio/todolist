import * as yup from "yup"
import React from 'react'
import { styled } from '@mui/system'

import { FormProvider, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { TaskSchema } from "../../../../../schemas"

import Swal from 'sweetalert2'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import ButtonGroup from '@mui/material/ButtonGroup'
import Button from "@mui/material/Button"

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import DeleteIcon from '@mui/icons-material/Delete'

import InputBase from "../../../../inputs/InputBase"

import { prepareDate } from '../../../../../utils/datetools'

import useProjects from "../../../../../hooks/useProjects"
import useTasks from "../../../../../hooks/useTasks"
import useToast from "../../../../../hooks/useToast"
import useModal from "../../../../../hooks/useModal"

import { ERR_TYPE_BY_MULTIPLE_FIELDS } from "../../../../../types/errTypes"

type FormFields = yup.InferType<typeof TaskSchema>

const initValues:FormFields = { 
    title: '',
    description: '',
    status: 'TODO',
    project_id: 0,
    due_date: undefined,
    due_time: '',
    starred: false
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
    paddingLeft: '20px',
    paddingRight: '20px',
}))

const DeleteBtn = styled(Button)(() => ({
    fontFamily: '"Montserrat" !important',
    fontSize: '.9rem',
    fontWeight: '500',
    color: '#BF0426',
    border: '1px solid #BF0426',
    padding: '10px 0px',
    '&:hover': {
        color: '#8C031C',
        border: '1px solid #8C031C',
    }
}))

interface TaskMenuFormProp {
    isEdit: boolean;
    task: FormFields;
}

const TaskMenuForm = ({ isEdit, task }:TaskMenuFormProp) => {

    const { projects } = useProjects()
    const { saveTask, deleteTask, updateTask } = useTasks()
    const { showErrorToast, showSuccessToast } = useToast()
    const { closeModal: closeTaskModal } = useModal("taskmenu")

    const [ starred, setStarred ] = React.useState(false)

    const defaultValues = React.useMemo(() => {
        return isEdit? {
            title: task.title,
            description: task.description,
            status: task.status,
            project_id: (task.project instanceof Object)? task.project.id : 0,
            due_date: task.due_date? task.due_date : undefined,
            due_time: task.due_time,
            starred: task.starred
        } : initValues
    }, [isEdit, task])

    const selectProjectsValue = React.useMemo(() => {
        const _projects =  projects.map(( project ) => ({
            id: project.id,
            name: project.title,
        }))

        return [{
            id: 0,
            name: 'None',
        }, ..._projects]
    }, [projects])

    const methods = useForm<FormFields>({
        defaultValues,
        resolver: yupResolver(TaskSchema), 
        mode: "onChange"
    })

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

    const handleDeleteTask = () => {
        Swal.fire({
            icon: "question",
            title: "Do you want to delete this task?",
            text: "Once the task is deleted, you won't be able to recover it",
            showConfirmButton: false,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `Delete Task`
        }).then((result) => {
            if (result.isDenied) deleteTask(task.id, (status) => {
                if (status) {
                    showSuccessToast("Task Deleted")
                    closeTaskModal()
                } else {
                    showErrorToast("ERR")
                }
            })
        });
    }

    const onSubmit = (data:FormFields) => {
        data.due_date = prepareDate(data.due_date)
        data.starred = starred

        if (isEdit) {
            data.id = task.id
            //alert("DATE: "+data.due_date)
            updateTask(data, (status, _data) => {
                if (status) {
                    showSuccessToast("The Task has been successfully updated.")
                    closeTaskModal()
                } else {
                    showErrFields(_data)
                    showErrorToast("The task could not be updated.")
                }
            })
        } else {
            saveTask(data, (status, _data) => {
                if (status) {
                    showSuccessToast("New task has been successfully registered.")
                    closeTaskModal()
                } else {
                    showErrFields(_data)
                    showErrorToast("The task could not be registered.")
                }
            })
        }
    }

    React.useEffect(() => {
        if (isEdit && task) {
            setStarred(task.starred? true : false)
        }
    }, [isEdit, task])

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box sx={{ flexGrow: 1 }}>
                    <InputBase id="title" title="Task*" placeholder="Buy groceries" endIcon={starred? (<StarIcon />) : (<StarBorderIcon />) } onEndIconClick={() => { setStarred(!starred) }} />
                    <InputBase id="project_id" title="Project" placeholder="Default" type="select" values={selectProjectsValue} defaultvalue={defaultValues.project_id} />
                    <Grid container>
                        <Grid item  xs={12} sm={4}>
                            <InputBase id="status" title='Status' type="select" values={[ { id: 'TODO', name: 'To Do' }, {id: 'DOING', name: 'Doing'}, {id: 'DONE', name: 'Done'} ]} defaultvalue={defaultValues.status} />
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
                                    <InputBase id="due_date" title='Date' placeholder="Start date" type="date" defaultvalue={defaultValues.due_date} minDate={new Date()} />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputBase id="due_time" title='Time' placeholder="HH:MM" type="time" defaultvalue={defaultValues.due_time} />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box mt={2} sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: isEdit? "space-between" : 'flex-end', 
                    alignItems: 'center', 
                    borderTop: '1px solid rgba(0, 0, 0, .3)', 
                    paddingTop: '10px' 
                }}>
                    {isEdit && (<DeleteBtn variant="outlined" onClick={handleDeleteTask}><DeleteIcon /></DeleteBtn>)}    
                    
                    <ButtonGroup variant="text" aria-label="Basic button group">
                        <CustomButton onClick={() => { 
                            if (isEdit && task) setStarred(task.starred? true : false); else setStarred(false);

                            methods.reset(); 
                        }} disableFocusRipple disableRipple>Reset Form</CustomButton>
                        <CustomButton type="submit" sx={{ textTransform: 'uppercase', fontWeight: '500' }}>{isEdit? 'Update' : 'Register'}</CustomButton>
                    </ButtonGroup>
                </Box>
            </Form>
        </FormProvider>
    )
}

export default TaskMenuForm

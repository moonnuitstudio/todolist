import * as yup from "yup"

export const TaskSchema = yup.object({
    title: yup.string().required('Task title is required'),
    description: yup.string(),
    status: yup.string(),
    project_id: yup.number().required('Project is required'),
    due_date: yup.date().nullable().typeError("Please enter a valid date").when(['due_time'], ([due_time], schema) => {
        if (due_time && due_time !== "") return schema.required("Due date is required")

        return schema
    }),
    due_time: yup.string(),
    starred: yup.bool(),
})

export const ProjectSchema = yup.object({
    title: yup.string().required('Project name is required'),
})
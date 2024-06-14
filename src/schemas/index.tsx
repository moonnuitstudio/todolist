import * as yup from "yup"

export const TaskSchema = yup.object({
    title: yup.string().required('Task title is required'),
    description: yup.string(),
    state: yup.string(),
    duedate: yup.date().nullable().typeError("Please enter a valid date").when(['duetime'], ([duetime], schema) => {
        if (duetime && duetime !== "") return schema.required("Due date is required")

        return schema
    }),
    duetime: yup.string(),
})

export const ProjectSchema = yup.object({
    title: yup.string().required('Project name is required'),
})
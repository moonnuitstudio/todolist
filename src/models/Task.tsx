import * as yup from "yup"
import { TaskSchema } from "../schemas";

export type TaskSchemaType = yup.InferType<typeof TaskSchema>

export interface TaskType {
    id: number;
    title: string;
    due: string;
    status: string;
    project: number;
    starred: boolean;
}  

export function createTableTask(
    id: number,
    title: string,
    due: string,
    status: string,
    project: number,
    starred: boolean
): TaskType {
    return {
      id,
      title,
      due,
      status,
      project,
      starred
    };
}

export interface TableTaskHeadCell {
    disablePadding: boolean;
    id: keyof TaskType;
    label: string;
    numeric: boolean;
    order: string;
}  

export const TBLHEADTASK: readonly TableTaskHeadCell[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Task',
        order: 'title',
    },{
        id: 'project',
        numeric: false,
        disablePadding: true,
        label: 'Project',
        order: 'project_id',
    },{
        id: 'status',
        numeric: false,
        disablePadding: true,
        label: 'Status',
        order: 'status',
    },{
        id: 'due',
        numeric: false,
        disablePadding: true,
        label: 'Due',
        order: 'due_date',
    }
];

export const TABLETBLHEADTASK: readonly TableTaskHeadCell[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Task',
        order: 'title',
    },{
        id: 'due',
        numeric: false,
        disablePadding: true,
        label: 'Due',
        order: 'due_date',
    }
];

export const MOBILETBLHEADTASK: readonly TableTaskHeadCell[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Task',
        order: 'title',
    }
];
import * as yup from "yup"
import { TaskSchema } from "../schemas";

export type TaskSchemaType = yup.InferType<typeof TaskSchema>

export interface TaskType {
    id: number;
    title: string;
    due: string;
    status: string;
    project: number;
    started: boolean;
}  

export function createTableTask(
    id: number,
    title: string,
    due: string,
    status: string,
    project: number,
    started: boolean
): TaskType {
    return {
      id,
      title,
      due,
      status,
      project,
      started
    };
}

export interface TableTaskHeadCell {
    disablePadding: boolean;
    id: keyof TaskType;
    label: string;
    numeric: boolean;
}  

export const TBLHEADTASK: readonly TableTaskHeadCell[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Task',
    },{
        id: 'project',
        numeric: false,
        disablePadding: true,
        label: 'Project',
    },{
        id: 'status',
        numeric: false,
        disablePadding: true,
        label: 'Status',
    },{
        id: 'due',
        numeric: false,
        disablePadding: true,
        label: 'Due',
    }
];

export const TABLETBLHEADTASK: readonly TableTaskHeadCell[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Task',
    },{
        id: 'due',
        numeric: false,
        disablePadding: true,
        label: 'Due',
    }
];

export const MOBILETBLHEADTASK: readonly TableTaskHeadCell[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Task',
    }
];
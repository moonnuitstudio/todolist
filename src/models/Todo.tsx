export interface TableTaskType {
    id: number;
    title: string;
    due: string;
    completed: boolean;
    project: string;
    started: boolean;
}  

export function createTableTask(
    id: number,
    title: string,
    due: string,
    completed: boolean,
    project: string,
    started: boolean
): TableTaskType {
    return {
      id,
      title,
      due,
      completed,
      project,
      started
    };
}

export interface TableTaskHeadCell {
    disablePadding: boolean;
    id: keyof TableTaskType;
    label: string;
    numeric: boolean;
}  

export interface ModalTaskType {
  
}

export const tableTaskHeadCells: readonly TableTaskHeadCell[] = [
    {
      id: 'title',
      numeric: false,
      disablePadding: true,
      label: 'Task',
    },
    {
      id: 'project',
      numeric: false,
      disablePadding: true,
      label: 'Project',
    },
    {
      id: 'due',
      numeric: false,
      disablePadding: true,
      label: 'Due',
    },
    {
      id: 'started',
      numeric: true,
      disablePadding: false,
      label: 'Started',
    }
];

export const tableTaskTableVersionHeadCells: readonly TableTaskHeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Task',
  },
  {
    id: 'started',
    numeric: true,
    disablePadding: false,
    label: 'Started',
  }
];
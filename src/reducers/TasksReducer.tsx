import { createSlice } from '@reduxjs/toolkit';

export interface ITaskReducer {
    reload: boolean;
}

const initialStates:ITaskReducer = {
    reload: true,
}


const TasksSlice = createSlice({
    name: 'token',
    initialState: initialStates,
    reducers: {
        actionReloadTask(state) {
            return {
                ...state,
                reload: true,
            }
        },
        actionStopReloadTask(state) {
            return {
                ...state,
                reload: false,
            }
        }
    }
})

export const { actionReloadTask, actionStopReloadTask } = TasksSlice.actions

export default TasksSlice.reducer
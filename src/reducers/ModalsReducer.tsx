/* eslint-disable no-case-declarations */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ProjectType } from '../models/Project';

import { TaskType } from '../models/Task';

export interface IExtraInfo {
    taskmenu: unknown;
    projectModal: unknown;
    mobilemenu: unknown;
}

export interface IModalReducer {
    taskmenu: boolean;
    projectModal: boolean;
    mobilemenu: boolean;
    extrainfo: IExtraInfo
}

const initialStates:IModalReducer = {
    taskmenu: false,
    projectModal: false,
    mobilemenu: false,
    extrainfo: {
        taskmenu: null,
        projectModal: null,
        mobilemenu: null,
    }
}

interface plaModal {
    key:string;
    data?: null | TaskType | ProjectType;
}


// eslint-disable-next-line react-refresh/only-export-components
const ModalsSlice = createSlice({
    name: 'modals',
    initialState: initialStates,
    reducers: {
        actionOpenModal(state, action:PayloadAction<plaModal>) {
            return {
                ...state,
                [action.payload.key]: true,
                extrainfo: {
                    ...state.extrainfo,
                    [action.payload.key]: action.payload.data
                }
            }
        },
        actionCloseModal(state, action:PayloadAction<string>) {
            return {
                ...state,
                [action.payload]: false,
                extrainfo: {
                    ...state.extrainfo,
                    [action.payload]: null
                }
            }
        }
    }
})

export const { actionOpenModal, actionCloseModal } = ModalsSlice.actions

export default ModalsSlice.reducer
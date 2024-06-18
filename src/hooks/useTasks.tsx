import { useSelector, useDispatch } from 'react-redux'

import { actionReloadTask, actionStopReloadTask } from '../reducers/TasksReducer'

import { TaskSchemaType } from "../models/Task";

import useToken from './useToken'

import AxiosClient, { generateConfig } from '../utils/AxiosClient'

import { RootState, AppDispatch } from '../store'

import { ITaskReducer } from '../reducers/TasksReducer'

type ResultHandleType = (r:boolean, data:null | unknown) => void

interface QueryTaskType {
    limit: number,
    page: number,
    orderBy: string,
    order: string,
}

const useTasks = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { token: authToken } = useToken()

    const { reload } = useSelector<RootState, ITaskReducer>(state => state.tasks)

    const saveTask = (project:TaskSchemaType, result:null | ResultHandleType=null) => {
        AxiosClient.post("/tasks", project, generateConfig(authToken || "")).then(() => {
            dispatch(actionReloadTask())
            result?.(true, null)
        }).catch(({ response: { data } }) => {
            result?.(false, data)
        })
    }

    const updateTask = (id:number, project:TaskSchemaType, result:null | ResultHandleType=null) => {
        AxiosClient.put(`/tasks/${id}`, project, generateConfig(authToken || "")).then(() => {
            dispatch(actionReloadTask())
            result?.(true, null)
        }).catch(({ response: { data } }) => {
            result?.(false, data)
        })
    }

    const updateStarOnTask = (id:number, star:boolean, result:null | ResultHandleType=null) => {
        AxiosClient.put(`/tasks/${id}/star`, { starred: star }, generateConfig(authToken || "")).then(() => {
            result?.(true, null)
        }).catch(() => {
            result?.(false, null)
        })
    }

    const getAllTasks = (token: null | string = null, query: QueryTaskType, result:null | ResultHandleType=null) => {
        let _token = "";

        if (authToken) _token = authToken
        else if (token) _token = token

        AxiosClient.get(`/tasks?limit=${query.limit}&page=${query.page}&orderby=${query.orderBy}&order=${query.order}`, generateConfig(_token)).then(({ data }) => {
            dispatch(actionStopReloadTask())
            result?.(true, data)
        }).catch(({ response: { data } }) => {
            dispatch(actionStopReloadTask())
            result?.(false, data)
        })
    }

    const getAllTasksByProjectID = (token: null | string = null, projectid:number, query: QueryTaskType, result:null | ResultHandleType=null) => {
        let _token = "";

        if (authToken) _token = authToken
        else if (token) _token = token

        AxiosClient.get(`projects/${projectid}/tasks?limit=${query.limit}&page=${query.page}&orderby=${query.orderBy}&order=${query.order}`, generateConfig(_token)).then(({ data }) => {
            dispatch(actionStopReloadTask())
            result?.(true, data)
        }).catch(({ response: { data } }) => {
            dispatch(actionStopReloadTask())
            result?.(false, data)
        })
    }

    const deleteTask = (id:number, result:null | ResultHandleType=null) => {
        AxiosClient.delete(`/tasks/${id}`, generateConfig(authToken || "")).then(() => {
            dispatch(actionReloadTask())
            result?.(true, null)
        }).catch(({ response: { data } }) => {
            result?.(false, data)
        })
    }

    const deleteTaskNoReload = (id:number, result:null | ResultHandleType=null) => {
        AxiosClient.delete(`/tasks/${id}`, generateConfig(authToken || "")).then(() => {
            result?.(true, null)
        }).catch(({ response: { data } }) => {
            result?.(false, data)
        })
    }

    const forceReloadTask = () => { dispatch(actionReloadTask()) }

    return {
        reload,
        saveTask,
        updateTask,
        getAllTasks,
        forceReloadTask,
        updateStarOnTask,
        deleteTask,
        deleteTaskNoReload,
        getAllTasksByProjectID
    }
}

export default useTasks
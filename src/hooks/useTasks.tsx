import { useSelector, useDispatch } from 'react-redux'

import { actionReloadTask, actionStopReloadTask } from '../actions/TasksReducerActions'

import { TaskSchemaType } from "../models/Task";

import useToken from './useToken'

import AxiosClient, { generateConfig } from '../utils/AxiosClient'

type ResultHandleType = (r:boolean, data:null | unknown) => void

interface QueryTaskType {
    limit: number,
    page: number,
    orderBy: string,
    order: string,
}

const useTasks = () => {
    const dispatch = useDispatch()
    const { token: authToken } = useToken()

    const { reload } = useSelector(state => state.tasks)

    const saveTask = (project:TaskSchemaType, result:null | ResultHandleType=null) => {
        AxiosClient.post("/tasks", project, generateConfig(authToken)).then(() => {
            dispatch(actionReloadTask())
            result?.(true, null)
        }).catch(({ response: { data } }) => {
            result?.(false, data)
        })
    }

    const updateStarOnTask = (id:number, star:boolean, result:null | ResultHandleType=null) => {
        AxiosClient.put(`/tasks/${id}/star`, { starred: star }, generateConfig(authToken)).then(() => {
            result?.(true, null)
        }).catch(({ response: { data } }) => {
            result?.(false, null)
        })
    }

    const getAllTasks = (token: null | string = null, query: QueryTaskType, result:null | ResultHandleType=null) => {
        AxiosClient.get(`/tasks?limit=${query.limit}&page=${query.page}&orderby=${query.orderBy}&order=${query.order}`, generateConfig(token? token : authToken)).then(({ data }) => {
            dispatch(actionStopReloadTask())
            result?.(true, data)
        }).catch(({ response: { data } }) => {
            dispatch(actionStopReloadTask())
            result?.(false, data)
        })
    }

    const forceReloadTask = () => { dispatch(actionReloadTask()) }

    return {
        reload,
        saveTask,
        getAllTasks,
        forceReloadTask,
        updateStarOnTask
    }
}

export default useTasks
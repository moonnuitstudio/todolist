import { useSelector, useDispatch } from 'react-redux'

import { TaskSchemaType } from "../models/Task";

import useToken from './useToken'

import AxiosClient, { generateConfig } from '../utils/AxiosClient'

type ResultHandleType = (r:boolean, data:null | unknown) => void

const useTasks = () => {

    const dispatch = useDispatch()

    const { token: authToken } = useToken()

    const saveTask = (project:TaskSchemaType, result:null | ResultHandleType=null) => {
        AxiosClient.post("/tasks", project, generateConfig(authToken)).then(({ data }) => {
            
            result?.(true, data)
        }).catch(({ response: { data } }) => {
            result?.(false, data)
        })
    }

    return {
        saveTask
    }
}

export default useTasks
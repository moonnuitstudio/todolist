import * as yup from "yup";

import { ProjectSchema } from "../schemas/index.js";

import { useSelector, useDispatch } from 'react-redux'

import { actionLoadProjects, actionSaveProject } from '../actions/ProjectsReducerActions'

import useToken from './useToken'

import AxiosClient, { generateConfig } from '../utils/AxiosClient'

type ProjectType = yup.InferType<typeof ProjectSchema>
type ResultHandleType = (r:boolean, data:null | unknown) => void

const useProjects = () => {
    const dispatch = useDispatch()
    const { token: authToken } = useToken()

    const { projects, loading } = useSelector(state => state.projects)

    const loadProject = (token: null | string = null) => {
        AxiosClient.get("/projects", generateConfig(token? token : authToken)).then(({ data }) => {
            dispatch(actionLoadProjects(data))
        })
    }

    const saveProject = (project:ProjectType, result:null | ResultHandleType=null) => {
        AxiosClient.post("/projects", project, generateConfig(authToken)).then(({ data }) => {
            dispatch(actionSaveProject(data))
            result?.(true, null)
        }).catch(({ response: { data } }) => {
            console.log("data", data)
            result?.(false, data)
        })
    }

    const getProjectById = (id:number) => {
        return projects.find((project) => {
            return project.ID == id
        })
    }

    return {
        projects,
        loading,
        loadProject,
        saveProject,
        getProjectById
    }
}

export default useProjects
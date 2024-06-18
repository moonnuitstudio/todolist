import { ProjectSchemaType } from "../models/Project.js";

import { useSelector, useDispatch } from 'react-redux'

import { actionLoadProjects, actionSaveProject, actionUpdateProject, actionDeleteProject } from '../reducers/ProjectsReducer.js'

import useToken from './useToken'

import AxiosClient, { generateConfig } from '../utils/AxiosClient'

import { RootState, AppDispatch } from '../store'

import { IProjectReducer } from '../reducers/ProjectsReducer'


type ResultHandleType = (r:boolean, data:null | unknown) => void

const useProjects = () => {
    const dispatch = useDispatch<AppDispatch>()

    const { token: authToken } = useToken()
    const { projects, loading } = useSelector<RootState, IProjectReducer>(state => state.projects)

    const loadProject = (token: null | string = null) => {

        let _token = "";

        if (authToken) _token = authToken
        else if (token) _token = token

        AxiosClient.get("/projects", generateConfig(_token)).then(({ data }) => {
            dispatch(actionLoadProjects(data))
        })
    }

    const saveProject = (project:ProjectSchemaType, result:null | ResultHandleType=null) => {
        AxiosClient.post("/projects", project, generateConfig(authToken || "")).then(({ data }) => {
            dispatch(actionSaveProject(data))
            result?.(true, null)
        }).catch(({ response: { data } }) => {
            result?.(false, data)
        })
    }

    const updateProject = (id:number, project:ProjectSchemaType, result:null | ResultHandleType=null) => {
        AxiosClient.put("/projects/"+id, project, generateConfig(authToken || "")).then(({ data }) => {
            dispatch(actionUpdateProject(data))
            result?.(true, null)
        }).catch(({ response: { data } }) => {
            result?.(false, data)
        })
    }

    const deleteProject = (id:number, result:null | ResultHandleType=null) => {
        AxiosClient.delete("/projects/"+id, generateConfig(authToken || "")).then(() => {
            dispatch(actionDeleteProject(id))
            result?.(true, null)
        }).catch(({ response: { data } }) => {
            result?.(false, data)
        })
    }

    const getProjectById = (id:number) => {
        return projects.find((project) => {
            return project.id == id
        })
    }

    return {
        projects,
        loading,
        loadProject,
        saveProject,
        updateProject,
        deleteProject,
        getProjectById
    }
}

export default useProjects
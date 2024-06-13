import { ProjectSchemaType } from "../models/Project.js";

import { useSelector, useDispatch } from 'react-redux'

import { actionLoadProjects, actionSaveProject, actionUpdateProject, actionDeleteProject } from '../actions/ProjectsReducerActions'

import useToken from './useToken'

import AxiosClient, { generateConfig } from '../utils/AxiosClient'

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

    const saveProject = (project:ProjectSchemaType, result:null | ResultHandleType=null) => {
        AxiosClient.post("/projects", project, generateConfig(authToken)).then(({ data }) => {
            dispatch(actionSaveProject(data))
            result?.(true, null)
        }).catch(({ response: { data } }) => {
            result?.(false, data)
        })
    }

    const updateProject = (id:number, project:ProjectSchemaType, result:null | ResultHandleType=null) => {
        AxiosClient.put("/projects/"+id, project, generateConfig(authToken)).then(({ data }) => {
            dispatch(actionUpdateProject(data))
            result?.(true, null)
        }).catch(({ response: { data } }) => {
            result?.(false, data)
        })
    }

    const deleteProject = (id:number, result:null | ResultHandleType=null) => {
        AxiosClient.delete("/projects/"+id, generateConfig(authToken)).then(() => {
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
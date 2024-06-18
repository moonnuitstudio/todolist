// /* eslint-disable no-case-declarations */
// import { 
//     REDU_LOAD_PROJECTS,
//     REDU_SAVE_PROJECTS,
//     REDU_UPDATE_PROJECTS,
//     REDU_DELETE_PROJECTS,
// } from '../reducertypes/projectsReducerTypes'

import { ProjectType } from '../models/Project'
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IProjectReducer {
    projects: ProjectType[];
    loading: boolean;
}

const initialStates:IProjectReducer = {
    projects: [],
    loading: true,
}

// eslint-disable-next-line react-refresh/only-export-components
const ProjectsSlice = createSlice({
    name: 'projects',
    initialState: initialStates,
    reducers: {
        actionLoadProjects(state, action:PayloadAction<ProjectType[]>) {
            return {
                ...state,
                projects: action.payload,
                loading: false,
            }
        },
        actionSaveProject(state, action:PayloadAction<ProjectType>) {
            return {
                ...state,
                projects: [...state.projects, action.payload]
            }
        },
        actionUpdateProject(state, action:PayloadAction<ProjectType>) {
            return {
                ...state,
                projects: state.projects.map(project => (project.id == action.payload.id)? action.payload : project)
            }
        },
        actionDeleteProject(state, action:PayloadAction<number>) {
            return {
                ...state,
                projects: state.projects.filter(project => project.id != action.payload)
            }
        }
    }
})


export const { actionLoadProjects, actionSaveProject, actionUpdateProject, actionDeleteProject } = ProjectsSlice.actions

export default ProjectsSlice.reducer
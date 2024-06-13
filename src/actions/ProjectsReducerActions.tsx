/* eslint-disable no-case-declarations */
import { 
    REDU_LOAD_PROJECTS,
    REDU_SAVE_PROJECTS,
    REDU_UPDATE_PROJECTS,
    REDU_DELETE_PROJECTS
} from '../reducertypes/projectsReducerTypes.js'

export function actionLoadProjects(projects) {
    return async (dispatch) => dispatch({
        type: REDU_LOAD_PROJECTS,
        payload: projects
    })
}

export function actionSaveProject(project) {
    return async (dispatch) => dispatch({
        type: REDU_SAVE_PROJECTS,
        payload: project
    })
}

export function actionUpdateProject(project) {
    return async (dispatch) => dispatch({
        type: REDU_UPDATE_PROJECTS,
        payload: project
    })
}

export function actionDeleteProject(id) {
    return async (dispatch) => dispatch({
        type: REDU_DELETE_PROJECTS,
        payload: id
    })
}
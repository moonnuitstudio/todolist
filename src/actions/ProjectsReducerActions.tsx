/* eslint-disable no-case-declarations */
import { 
    REDU_LOAD_PROJECTS,
    REDU_SAVE_PROJECTS
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
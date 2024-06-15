/* eslint-disable no-case-declarations */
import { 
    REDU_RELOAD_TASKS,
    REDU_STOPRELOAD_TASKS
} from '../reducertypes/taskReducerTypes.js'

export function actionReloadTask() {
    return async (dispatch) => dispatch({
        type: REDU_RELOAD_TASKS
    })
}

export function actionStopReloadTask() {
    return async (dispatch) => dispatch({
        type: REDU_STOPRELOAD_TASKS
    })
}
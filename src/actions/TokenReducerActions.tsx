/* eslint-disable no-case-declarations */
import { 
    REDU_SAVE_TOKEN,
    REDU_FORGET_TOKEN
} from '../reducertypes/tokenReducerTypes.js'

export function actionSaveToken(token:string) {
    return async (dispatch) => dispatch({
        type: REDU_SAVE_TOKEN,
        payload: token
    })
}

export function actionForgetToken() {
    return async (dispatch) => dispatch({
        type: REDU_FORGET_TOKEN,
    })
}
import * as yup from "yup";

import { ProjectSchema } from "../schemas/index.js";

import {
    REDU_OPEN_MODAL,
    REDU_CLOSE_MODAL
} from "../reducertypes/modalReducerTypes.js"

import { TableTaskType } from "../models/Task.js"

type ProjectType = yup.InferType<typeof ProjectSchema>

export function actionOpenModal(key:string, data?: null | TableTaskType | ProjectType) {
    return async (dispatch) => dispatch({
        type: REDU_OPEN_MODAL,
        payload: {
            key,
            info: data
        }
    })
}

export function actionCloseModal(key:string) {
    return async (dispatch) => dispatch({
        type: REDU_CLOSE_MODAL,
        payload: key
    })
}
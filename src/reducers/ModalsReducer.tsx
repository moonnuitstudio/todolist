/* eslint-disable no-case-declarations */
import { 
    REDU_OPEN_MODAL,
    REDU_CLOSE_MODAL
} from '../reducertypes/modalReducerTypes.js'

const initialStates = {
    taskmenu: false,
    projectModal: false,
    mobilemenu: false,
    extrainfo: {
        taskmenu: null,
        projectModal: null,
        mobilemenu: null,
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export default function(state = initialStates, action) {
    const { type } = action

    switch(type) {
        case REDU_OPEN_MODAL:
            return {
                ...state,
                [action.payload.key]: true,
                extrainfo: {
                    ...state.extrainfo,
                    [action.payload.key]: action.payload.info
                }
            }

        case REDU_CLOSE_MODAL:
            return {
                ...state,
                [action.payload]: false,
                extrainfo: {
                    ...state.extrainfo,
                    [action.payload]: null
                }
            }

        default:
            return state
    }
}

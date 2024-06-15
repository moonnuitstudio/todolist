import {
    REDU_RELOAD_TASKS,
    REDU_STOPRELOAD_TASKS
} from '../reducertypes/taskReducerTypes.js'

const initialStates = {
    reload: true,
}

// eslint-disable-next-line react-refresh/only-export-components
export default function(state = initialStates, action) {
    const { type } = action

    switch(type) {

        case REDU_RELOAD_TASKS:
            return {
                ...state,
                reload: true,
            }

        case REDU_STOPRELOAD_TASKS:
            return {
                ...state,
                reload: false,
            }

        default:
            return state
    }
}
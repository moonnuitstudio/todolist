/* eslint-disable no-case-declarations */
import { 
    REDU_SAVE_TOKEN,
    REDU_FORGET_TOKEN
} from '../reducertypes/tokenReducerTypes.js'

const initialStates = {
    token: null
}

// eslint-disable-next-line react-refresh/only-export-components
export default function(state = initialStates, action) {
    const { type } = action

    switch(type) {
        case REDU_SAVE_TOKEN:
            return {
                ...state,
                token: action.payload
            }

        case REDU_FORGET_TOKEN:
            return {
                ...state,
                token: null
            }

        default:
            return state
    }
}
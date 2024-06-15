/* eslint-disable no-case-declarations */
import { 
    REDU_LOAD_PROJECTS,
    REDU_SAVE_PROJECTS,
    REDU_UPDATE_PROJECTS,
    REDU_DELETE_PROJECTS,
} from '../reducertypes/projectsReducerTypes.js'

const initialStates = {
    projects: [],
    loading: true,
}

// eslint-disable-next-line react-refresh/only-export-components
export default function(state = initialStates, action) {
    const { type } = action

    switch(type) {
        case REDU_LOAD_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                loading: false,
            }

        case REDU_SAVE_PROJECTS: 
            return {
                ...state,
                projects: [...state.projects, action.payload]
            }

        case REDU_UPDATE_PROJECTS:
            return {
                ...state,
                projects: state.projects.map(project => (project.id == action.payload.id)? action.payload : project)
            }

        case REDU_DELETE_PROJECTS:
            return {
                ...state,
                projects: state.projects.filter(project => project.id != action.payload)
            }

        default:
            return state
    }
}
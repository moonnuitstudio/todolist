import { combineReducers } from "redux"

import ModalsReducer from "./ModalsReducer"
import TokenReducer from "./TokenReducer"
import ProjectsReducer from "./ProjectsReducer"
import TasksReducer from "./TasksReducer"

// eslint-disable-next-line react-refresh/only-export-components
export default combineReducers({
    modals: ModalsReducer,
    token: TokenReducer,
    projects: ProjectsReducer,
    tasks: TasksReducer,
})
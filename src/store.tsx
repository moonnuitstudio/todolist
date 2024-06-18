import { configureStore } from '@reduxjs/toolkit'

import ModalsReducer from "./reducers/ModalsReducer"
import TokenReducer from "./reducers/TokenReducer"
import ProjectsReducer from "./reducers/ProjectsReducer"
import TasksReducer from "./reducers/TasksReducer"

const store = configureStore({
    reducer: {
        modals: ModalsReducer,
        token: TokenReducer,
        projects: ProjectsReducer,
        tasks: TasksReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
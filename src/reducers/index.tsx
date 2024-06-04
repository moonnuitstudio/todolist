import { combineReducers } from "redux";

import modalsReducer from "./ModalsReducer";

// eslint-disable-next-line react-refresh/only-export-components
export default combineReducers({
    modals: modalsReducer
})
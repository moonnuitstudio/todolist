/* eslint-disable no-case-declarations */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ITokenReducer {
    token:null | string
}

const initialStates:ITokenReducer = {
    token: null
}

// eslint-disable-next-line react-refresh/only-export-components
const TokenSlice = createSlice({
    name: 'token',
    initialState: initialStates,
    reducers: {
        actionSaveToken(state, action:PayloadAction<string>) {
            return {
                ...state,
                token: action.payload
            }
        },
        actionForgetToken(state) {
            return {
                ...state,
                token: null
            }
        }
    }
})

export const { actionSaveToken, actionForgetToken } = TokenSlice.actions

export default TokenSlice.reducer
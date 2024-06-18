import { useSelector, useDispatch } from 'react-redux'

import { actionSaveToken, actionForgetToken } from '../reducers/TokenReducer'

import { RootState, AppDispatch } from '../store'

import { ITokenReducer } from '../reducers/TokenReducer'

const useToken = () => {
    const dispatch = useDispatch<AppDispatch>()

    const { token } = useSelector<RootState, ITokenReducer>(state => state.token)

    const saveToken = (token:string) => dispatch(actionSaveToken(token))
    const forgetToken = () => dispatch(actionForgetToken())

    return {
        token,
        saveToken,
        forgetToken,
    }
}

export default useToken
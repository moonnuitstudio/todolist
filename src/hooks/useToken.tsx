import { useSelector, useDispatch } from 'react-redux'

import { actionSaveToken, actionForgetToken } from '../actions/TokenReducerActions'


const useToken = () => {
    const dispatch = useDispatch()

    const { token } = useSelector(state => state.token)

    const saveToken = (token:string) => dispatch(actionSaveToken(token))
    const forgetToken = () => dispatch(actionForgetToken())

    return {
        token,
        saveToken,
        forgetToken,
    }
}

export default useToken
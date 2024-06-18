import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { actionOpenModal, actionCloseModal } from '../reducers/ModalsReducer'

import { TaskType } from '../models/Task'
import { ProjectType } from '../models/Project'

import { RootState, AppDispatch } from '../store'

import { IModalReducer } from '../reducers/ModalsReducer'

const useModal = (title:string) => {
    const dispatch = useDispatch<AppDispatch>()

    const { taskmenu, projectModal, mobilemenu, extrainfo } = useSelector<RootState, IModalReducer>(state => state.modals)

    const open = React.useMemo<boolean>(() => {
        switch(title) {
            case "taskmenu":
                return taskmenu;
            case "projectModal":
                return projectModal;
            case "mobilemenu":
                    return mobilemenu;
            default:
                return false
        }
    }, [taskmenu, projectModal, mobilemenu, title])

    const data = React.useMemo(() => {
        switch(title) {
            case "taskmenu":
                return extrainfo.taskmenu;
            case "projectModal":
                return extrainfo.projectModal;
            case "mobilemenu":
                    return extrainfo.mobilemenu;
            default:
                return {}
        }
    }, [extrainfo, title])


    const openModal = (data: null | TaskType | ProjectType = null) => dispatch(actionOpenModal({ key: title, data }))
    const closeModal = () => dispatch(actionCloseModal(title))

    const handleModal = (data: null | TaskType | ProjectType = null) => {
        if (open) closeModal()
        else openModal(data)
    }

    return {
        open,
        data,
        openModal,
        closeModal,
        handleModal
    }
}

export default useModal
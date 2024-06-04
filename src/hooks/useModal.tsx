import React from "react"

import { useSelector, useDispatch } from 'react-redux'

import { actionOpenModal, actionCloseModal } from '../actions/ModalReducerActions'

import { TableTaskType } from "../models/Task"

const useModal = (title:string) => {
    const dispatch = useDispatch()

    const { [title]: open, extrainfo } = useSelector(state => state.modals)
    const { [title]: data } = extrainfo

    const openModal = (data: null | TableTaskType = null) => dispatch(actionOpenModal(title, data))
    const closeModal = () => dispatch(actionCloseModal(title))

    const handleModal = (data: null | TableTaskType = null) => {
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
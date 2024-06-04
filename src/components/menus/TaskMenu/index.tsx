import React from 'react'

import { styled } from '@mui/system'

import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'

import TaskMenuContent from './TaskMenuContent'

import useModal from '../../../hooks/useModal'

const BoxContainer = styled(Box)(({ theme }) => ({
    width: 550,
    background: 'transparent !important',
    padding: '20px 20px 0px',
    [theme.breakpoints.down('sm')]: {
        width: '100vw',
        paddingBottom: '50px'
    }
}))

const TaskMenu = () => {
    const { open, closeModal } = useModal("taskmenu")

    return (
        <Drawer anchor="right" open={open} onClose={closeModal}>
            <BoxContainer role="presentation">
                <TaskMenuContent onCloseModal={closeModal} />
            </BoxContainer>
        </Drawer>
    )
}

export default TaskMenu

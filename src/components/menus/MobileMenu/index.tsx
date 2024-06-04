import React from 'react'

import { styled } from '@mui/system'

import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import MobileMenuContent from './MobileMenuContent'

import useModal from '../../../hooks/useModal'

const BoxContainer = styled(Box)(({ theme }) => ({
    width: 300,
    background: 'transparent !important',
    padding: '20px 20px 10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
        width: '100vw',
        padding: '5px 10px 10px 10px',
    }
}))

const MobileMenu = () => {
    const { open, closeModal } = useModal("mobilemenu")

    return (
        <Drawer anchor="left" open={open} onClose={closeModal}>
            <BoxContainer role="presentation">
              <MobileMenuContent onCloseModal={closeModal} />
              <Box sx={{ flexGrow: 1 }} />
              <Button variant="outlined">Log Out</Button>
            </BoxContainer>
        </Drawer>
    )
}

export default MobileMenu

import { styled } from '@mui/system'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import IconButton from '@mui/material/IconButton'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import MenuIcon from '@mui/icons-material/Menu'

import Profile from './Profile'

import useResponsive from '../../hooks/useResponsive'
import { OnRefChangeType } from 'react-resize-detector/build/types/types'

type OnHandleOpenType = () => void

const HeaderContainer = styled(Box)(({ theme }) => ({
    borderBottom: '1px solid rgba(0,0,0,.2)',
    [theme.breakpoints.down('lg')]: {
        padding: '0px 5% !important',
    }
}))

interface HeaderType {
    appref: OnRefChangeType<HTMLElement>;
    onHandleOpen: OnHandleOpenType;
}

const HeaderToolbar  = ({ appref, onHandleOpen }:HeaderType) => {

    const { isDesktopVersion } = useResponsive()

    const BtnMenu = <IconButton onClick={onHandleOpen} aria-label="open-menu" disableRipple> <MenuIcon sx={{ color: 'black' }} /> </IconButton> 

    return (
        <AppBar ref={appref} position="static" elevation={0} sx={{ background: 'transparent' }}>
            <HeaderContainer>
                <Toolbar disableGutters sx={{ alignItems: 'center', minHeight: '48px !important' }}>
                    <Stack flexDirection="row" alignItems="center" sx={{ width: '100%' }}>
                        {isDesktopVersion && (BtnMenu) }
                        <Typography variant='h3' sx={{ transform: 'translate(0px, 2px)' }}>ToDo List</Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        {isDesktopVersion? (<Profile />) : (BtnMenu)}
                    </Stack>
                </Toolbar>
            </HeaderContainer>
        </AppBar>

    )
}

export default HeaderToolbar 

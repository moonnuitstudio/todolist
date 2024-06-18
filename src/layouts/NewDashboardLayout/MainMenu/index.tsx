import React from 'react'

import { styled } from '@mui/system'

import Drawer from '@mui/material/Drawer'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

import MainMenuContent from './MainMenuContent'

import useResponsive from '../../../hooks/useResponsive'

import { useTheme } from '@mui/material/styles'
import { useAuth0 } from '@auth0/auth0-react'

const MainMenuContainerContent = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    padding: '10px 15px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('lg')]: {
        display: 'flex',
        flexDirection: 'column',
    }
}))

const AvatarInfoTypography = styled(Typography)(() => ({
    color: 'black',
    fontFamily: "'Montserrat'",
    fontWeight: '400',
    fontSize: '.95rem',
    lineHeight: '1.2rem',
}))

type OnMenuCloseType = () => void

interface MainMenuPropsType {
    menuWidth: number,
    tabletMenuWidth: number,
    open: boolean,
    onMenuClose: OnMenuCloseType,
}

const MainMenu = ({ menuWidth, tabletMenuWidth, open, onMenuClose }: MainMenuPropsType) => {

    const { isDesktopVersion, isMobile, isTabletOrMobile } = useResponsive()
    const { user, isAuthenticated, isLoading, logout } = useAuth0()

    const theme = useTheme();

    const menuRealWidth = React.useMemo<string>(() => {
        if (isMobile) return '100vw'
        else if (isTabletOrMobile) return `${tabletMenuWidth}px`

        return `${menuWidth}px`
    }, [isMobile, isTabletOrMobile, menuWidth, tabletMenuWidth])
    
    return (
        <Drawer
            sx={{
                width: menuRealWidth,
                flexShrink: 0,
                transition: 'width .2s ease-in-out',
                '& .MuiDrawer-paper': {
                    width: menuRealWidth,
                    boxSizing: 'border-box',
                    position: 'unset',
                    background: theme.palette.background.default,
                },
                ...(!open && {
                    width: '0px',
                })
            }}
            variant={ isDesktopVersion? "persistent" : "temporary" }
            anchor="left"
            open={open}
            onClose={() => { if (!isDesktopVersion) onMenuClose() }}
        >
            <MainMenuContainerContent>
                {isTabletOrMobile && (<>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <IconButton aria-label="close-modal" onClick={onMenuClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {isLoading && (<>
                        <Stack sx={{ width: '100%' }} flexDirection="row" justifyContent="center">
                            <Skeleton animation="wave" variant="circular" width={80} height={80} />
                        </Stack>
                        <Stack sx ={{ width: '100%', marginTop: '20px', gap: '5px', paddingBottom: '20px', marginBottom: '10px', borderBottom: '1px solid rgba(0,0,0,.2)' }} flexDirection="column" alignItems="center">
                            <AvatarInfoTypography sx={{ width: '100%' }}><Skeleton animation="wave" /></AvatarInfoTypography>
                            <AvatarInfoTypography sx={{ width: '100%' }}><Skeleton animation="wave" /></AvatarInfoTypography>
                        </Stack>
                    </>)}
                    {isAuthenticated && (<>
                        <Stack sx={{ width: '100%' }} flexDirection="row" justifyContent="center">
                            <Avatar sx={{ width: 80, height: 80 }}  alt="Remy Sharp" src={ isAuthenticated && user?.picture } />
                        </Stack>
                        <Stack sx ={{ width: '100%', marginTop: '20px', gap: '5px', paddingBottom: '20px', marginBottom: '10px', borderBottom: '1px solid rgba(0,0,0,.2)' }} flexDirection="column" alignItems="center">
                            <AvatarInfoTypography className='non-mouse-event'>{user?.nickname}</AvatarInfoTypography>
                            <AvatarInfoTypography className='non-mouse-event'>{user?.email}</AvatarInfoTypography>
                        </Stack>
                    </>)}
                </>)}

                <MainMenuContent onMenuClose={onMenuClose} />

                {isTabletOrMobile && (<Button sx={{ width: '100%' }} variant="outlined" onClick={() => { onMenuClose(); logout(); }}>Log Out</Button>)}
            </MainMenuContainerContent>
        </Drawer>
    )
}

export default MainMenu

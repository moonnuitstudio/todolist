import React from 'react'
import { styled } from '@mui/system'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

import { useAuth0 } from '@auth0/auth0-react'
import useResponsive from '../../../hooks/useResponsive'

const AvatarContainer = styled(Box)(() => ({
    flexGrow: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '20px',
    padding: '20px 0px'
}))

const AvatarTextContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
}))

const AvatarTitleTypography = styled(Typography)(() => ({
    color: 'black',
    fontFamily: "'League_Spartan'",
    fontWeight: '800',
    fontSize: '1.3rem',
    lineHeight: '1.2rem',
    textTransform: 'uppercase',
}))

const AvatarBodyTypography = styled(Typography)(() => ({
    ccolor: 'black',
    fontFamily: "'Montserrat'",
    fontWeight: '300',
    fontSize: '1rem',
    lineHeight: '1.2rem',
}))

const ProfileAvatar = () => {

    const { isTabletOrDesktop } = useResponsive()
    const { user, isAuthenticated, logout } = useAuth0()

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

    const openSubMenu = React.useMemo(() => Boolean(anchorElUser), [anchorElUser])

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElUser(event.currentTarget) }    
    const handleCloseUserMenu = () => { setAnchorElUser(null) }

    return (
        <>
            <AvatarContainer>
                {isTabletOrDesktop && (
                    <AvatarTextContainer>
                        <AvatarTitleTypography variant='body1'>Hi, { isAuthenticated && user?.name }</AvatarTitleTypography>
                        <AvatarBodyTypography variant='body1'>It is good to see you again</AvatarBodyTypography>
                    </AvatarTextContainer>
                )}
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src={ isAuthenticated? user?.picture : "" } />
                    </IconButton>
                </Tooltip>
            </AvatarContainer>

            <Menu
                id="menu-user-profile"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={openSubMenu}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu} onClickCapture={() => { logout() }}>
                    <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default ProfileAvatar

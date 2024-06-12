import React from 'react'

import { styled } from '@mui/system'

import Tooltip from '@mui/material/Tooltip'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import Skeleton from '@mui/material/Skeleton'

import { useAuth0 } from '@auth0/auth0-react'

const AvatarContainer = styled(Box)(() => ({
  flexGrow: 0,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '20px',
  paddingRight: '20px',
}))

const AvatarMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: theme.palette.background.default,
    border: '1px solid rgba(0, 0, 0, .3)',
    boxShadow: '0px 0px 14px -8px rgba(0,0,0,0.66) !important',
    marginTop: '5px',
  }
}))

const AvatarInfoMenu = styled(Stack)(() => ({
  padding: '10px 20px',
  marginBottom: '10px',
  boxSizing: 'border-box',
  flexDirection: 'column',
  alignItems: 'center',
  borderBottom: '1px solid rgba(0, 0, 0, .3)'
}))

const Profile = () => {

  const { user, isAuthenticated, logout, isLoading } = useAuth0()

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const openSubMenu = React.useMemo(() => Boolean(anchorElUser), [anchorElUser])

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElUser(event.currentTarget); }    
  const handleCloseUserMenu = () => { setAnchorElUser(null) }

  return (
    <>
      <AvatarContainer>
        {isLoading? (
          <Skeleton variant="circular" width={30} height={30} />
        ) : (
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} disableRipple>
              <Avatar sx={{ width: 30, height: 30 }}  alt="Remy Sharp" src={ isAuthenticated && user?.picture } />
              <KeyboardArrowDownIcon sx={{ color: 'black' }} />
            </IconButton>
          </Tooltip>
        )}
      </AvatarContainer>

      <AvatarMenu
        id="menu-user-profile"
        anchorEl={anchorElUser}
        anchorOrigin={{
            vertical: 'bottom',
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
        {isAuthenticated && (
          <AvatarInfoMenu>
            <Avatar sx={{ width: 48, height: 48 }} alt="Remy Sharp" src={user?.picture} />
            <Box sx={{ height: '10px' }} />
            <Typography variant='avatarinfo' className='non-mouse-event'>{user?.nickname}</Typography>
            <Typography variant='avatarinfo' className='non-mouse-event'>{user?.email}</Typography>
          </AvatarInfoMenu>
        )}
        <MenuItem onClick={handleCloseUserMenu} onClickCapture={() => { logout() }}>
            <Typography textAlign="center">Log Out</Typography>
        </MenuItem>
    </AvatarMenu>
    </>
  )
}

export default Profile

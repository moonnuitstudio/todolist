import { styled } from '@mui/system'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'

import ProfileAvatar from './ProfileAvatar'

import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import useResponsive from '../../hooks/useResponsive'

import useModal from '../../hooks/useModal'

const SpanList = styled('span')(({ theme }) => ({
    color: 'black',
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
    }
}))

const HeaderTypography = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
    }
}))

const HeaderContainer = styled(Container)(({ theme }) => ({
    [theme.breakpoints.down("lg")]: {
        padding: '0px 5% !important',
    }
}))

interface HeaderType {
    appref: React.RefObject<HTMLElement>;
}

const Header = ({ appref }:HeaderType) => {

    const { isTabletOrMobile, isMobile } = useResponsive()
    const { openModal } = useModal("mobilemenu")
    
    return (
        <AppBar ref={appref} position="static" elevation={0} sx={{ background: 'transparent' }}>
            <HeaderContainer maxWidth="xl">
                <Toolbar disableGutters sx={{ alignItems: 'center' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <HeaderTypography variant="h3">To Do <SpanList>List</SpanList></HeaderTypography>
                    </Box>
                    {!isMobile && (<ProfileAvatar />)}
                    {isTabletOrMobile && (<IconButton disableRipple aria-label="open menu" sx={{ paddingRight: '0px', color: 'black' }} onClick={() => { openModal() }}><MenuIcon /></IconButton>)}
                </Toolbar>
            </HeaderContainer>
        </AppBar>
    )
}

export default Header

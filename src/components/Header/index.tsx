import { styled } from '@mui/system'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'

import ProfileAvatar from './ProfileAvatar'

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

interface HeaderType {
    appref: React.RefObject<HTMLElement>;
}

const Header = ({ appref }:HeaderType) => {
    return (
        <AppBar ref={appref} position="static" elevation={0} sx={{ background: 'transparent' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <HeaderTypography variant="h3">To Do <SpanList>List</SpanList></HeaderTypography>
                    </Box>
                    <ProfileAvatar />
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
